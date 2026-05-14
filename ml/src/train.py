import os
import time
import numpy as np
import torch
import torch.nn as nn
from torch.optim import AdamW
from torch.optim.lr_scheduler import CosineAnnealingLR, LinearLR, SequentialLR
from tqdm import tqdm


# ── Metrics ───────────────────────────────────────────────────────────────────

def accuracy(logits: torch.Tensor, labels: torch.Tensor) -> float:
    preds = logits.argmax(dim=1)
    return (preds == labels).float().mean().item()


def top5_accuracy(logits: torch.Tensor, labels: torch.Tensor) -> float:
    top5  = logits.topk(5, dim=1).indices
    correct = top5.eq(labels.unsqueeze(1)).any(dim=1)
    return correct.float().mean().item()


# ── One epoch ─────────────────────────────────────────────────────────────────

def run_epoch(model, loader, criterion, optimizer, device, train: bool):
    model.train() if train else model.eval()

    total_loss, total_acc, total_top5 = 0.0, 0.0, 0.0
    n_batches = len(loader)

    ctx = torch.enable_grad() if train else torch.no_grad()
    with ctx:
        for imgs, tabs, labels in tqdm(loader, leave=False,
                                       desc="Train" if train else "Val  "):
            imgs   = imgs.to(device, non_blocking=True)
            tabs   = tabs.to(device, non_blocking=True)
            labels = labels.to(device, non_blocking=True)

            logits = model(imgs, tabs)
            loss   = criterion(logits, labels)

            if train:
                optimizer.zero_grad()
                loss.backward()
                nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
                optimizer.step()

            total_loss += loss.item()
            total_acc  += accuracy(logits, labels)
            total_top5 += top5_accuracy(logits, labels)

    return (
        total_loss  / n_batches,
        total_acc   / n_batches,
        total_top5  / n_batches,
    )


# ── Build optimizer + scheduler ───────────────────────────────────────────────

def build_optimizer_scheduler(model, config):
    optimizer = AdamW(
        model.parameters(),
        lr           = config.LR,
        weight_decay = config.WEIGHT_DECAY,
    )

    warmup = LinearLR(
        optimizer,
        start_factor = 0.1,
        end_factor   = 1.0,
        total_iters  = config.WARMUP_EPOCHS,
    )
    cosine = CosineAnnealingLR(
        optimizer,
        T_max   = config.NUM_EPOCHS - config.WARMUP_EPOCHS,
        eta_min = config.LR * 0.01,
    )
    scheduler = SequentialLR(
        optimizer,
        schedulers  = [warmup, cosine],
        milestones  = [config.WARMUP_EPOCHS],
    )
    return optimizer, scheduler


# ── Main train function ───────────────────────────────────────────────────────

def train(model, train_loader, val_loader, config, device, class_weights=None):
    criterion = nn.CrossEntropyLoss(
        weight=class_weights,
        label_smoothing=0.1
    )
    optimizer, scheduler = build_optimizer_scheduler(model, config)

    best_val_acc = 0.0
    history = {
        "train_loss": [], "train_acc": [], "train_top5": [],
        "val_loss"  : [], "val_acc"  : [], "val_top5"  : [],
        "lr"        : [],
    }

    print(f"\n{'='*60}")
    print(f"  Training DermaSense — {config.NUM_CLASSES} classes")
    print(f"  Epochs: {config.NUM_EPOCHS} | Batch: {config.BATCH_SIZE} | LR: {config.LR}")
    print(f"  Device: {device}")
    print(f"{'='*60}\n")

    for epoch in range(1, config.NUM_EPOCHS + 1):
        t0 = time.time()
        current_lr = optimizer.param_groups[0]["lr"]

        train_loss, train_acc, train_top5 = run_epoch(
            model, train_loader, criterion, optimizer, device, train=True
        )
        val_loss, val_acc, val_top5 = run_epoch(
            model, val_loader, criterion, optimizer, device, train=False
        )

        scheduler.step()
        elapsed = time.time() - t0

        history["train_loss"].append(train_loss)
        history["train_acc"].append(train_acc)
        history["train_top5"].append(train_top5)
        history["val_loss"].append(val_loss)
        history["val_acc"].append(val_acc)
        history["val_top5"].append(val_top5)
        history["lr"].append(current_lr)

        print(
            f"Epoch {epoch:03d}/{config.NUM_EPOCHS} | "
            f"T_loss: {train_loss:.4f}  T_acc: {train_acc:.4f}  T_top5: {train_top5:.4f} | "
            f"V_loss: {val_loss:.4f}  V_acc: {val_acc:.4f}  V_top5: {val_top5:.4f} | "
            f"LR: {current_lr:.2e}  [{elapsed:.0f}s]"
        )

        # ── Save best checkpoint ───────────────────────────────────────────────
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save({
                "epoch"          : epoch,
                "model_state"    : model.state_dict(),
                "optimizer_state": optimizer.state_dict(),
                "best_val_acc"   : best_val_acc,
                "num_classes"    : config.NUM_CLASSES,
            }, config.BEST_MODEL)
            print(f"  ✅ Best model saved (val_acc={best_val_acc:.4f})")

        # ── Save last checkpoint every 5 epochs ───────────────────────────────
        if epoch % 5 == 0:
            torch.save({
                "epoch"          : epoch,
                "model_state"    : model.state_dict(),
                "optimizer_state": optimizer.state_dict(),
                "best_val_acc"   : best_val_acc,
                "num_classes"    : config.NUM_CLASSES,
                "history"        : history,
            }, config.LAST_MODEL)

    print(f"\n{'='*60}")
    print(f"  Training complete. Best Val Acc: {best_val_acc:.4f}")
    print(f"{'='*60}\n")

    return history