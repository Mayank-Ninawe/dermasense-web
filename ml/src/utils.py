import os, random
import numpy as np
import torch


def set_seed(seed: int):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark     = False


def get_device(preferred: str = "cuda") -> torch.device:
    if preferred == "cuda" and torch.cuda.is_available():
        return torch.device("cuda")
    return torch.device("cpu")


def get_label_map(series):
    classes = sorted(series.dropna().unique().tolist())
    l2i = {c: i for i, c in enumerate(classes)}
    i2l = {i: c for c, i in l2i.items()}
    return l2i, i2l


def save_checkpoint(state: dict, path: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    torch.save(state, path)
    print(f"  ✅ Checkpoint saved → {path}")


def load_checkpoint(path: str, model, optimizer=None):
    ckpt = torch.load(path, map_location="cpu")
    model.load_state_dict(ckpt["model_state"])
    if optimizer and "optimizer_state" in ckpt:
        optimizer.load_state_dict(ckpt["optimizer_state"])
    print(f"  ✅ Checkpoint loaded ← {path}")
    return ckpt.get("epoch", 0), ckpt.get("best_val_acc", 0.0)