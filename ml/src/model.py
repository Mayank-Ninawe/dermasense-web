import torch
import torch.nn as nn
import timm


class TabularMLP(nn.Module):
    """Small MLP to encode 96 tabular features → 128-dim embedding."""
    def __init__(self, input_dim: int, hidden_dim: int = 128, dropout: float = 0.3):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(256, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(),
            nn.Dropout(dropout),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)


class DermaSenseModel(nn.Module):
    """
    Multimodal model:
      Image branch  : EfficientNet-B3 (pretrained) → 1536-dim
      Tabular branch: TabularMLP (96 → 128-dim)
      Fusion        : Concat (1536+128) → FC → num_classes
    """
    def __init__(
        self,
        num_classes: int,
        tabular_dim: int = 96,
        fusion_dim: int = 256,
        dropout: float = 0.3,
        pretrained: bool = True,
    ):
        super().__init__()

        # ── Image branch ──────────────────────────────────────────────────────
        self.backbone = timm.create_model(
            "efficientnet_b3",
            pretrained=pretrained,
            num_classes=0,          # remove classifier head
            global_pool="avg",
        )
        img_feat_dim = self.backbone.num_features   # 1536 for EfficientNet-B3

        # ── Tabular branch ────────────────────────────────────────────────────
        tab_out_dim = 128
        self.tab_mlp = TabularMLP(tabular_dim, tab_out_dim, dropout)

        # ── Fusion head ───────────────────────────────────────────────────────
        fused_dim = img_feat_dim + tab_out_dim       # 1536 + 128 = 1664
        self.fusion = nn.Sequential(
            nn.Linear(fused_dim, fusion_dim),
            nn.BatchNorm1d(fusion_dim),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(fusion_dim, num_classes),
        )

    def forward(
        self,
        images: torch.Tensor,      # (B, 3, 300, 300)
        tabular: torch.Tensor,     # (B, 96)
    ) -> torch.Tensor:             # (B, num_classes)

        img_feat = self.backbone(images)             # (B, 1536)
        tab_feat = self.tab_mlp(tabular)             # (B, 128)
        fused    = torch.cat([img_feat, tab_feat], dim=1)  # (B, 1664)
        return self.fusion(fused)                    # (B, num_classes)


def build_model(num_classes: int, tabular_dim: int = 96,
                fusion_dim: int = 256, dropout: float = 0.3,
                pretrained: bool = True) -> DermaSenseModel:
    return DermaSenseModel(
        num_classes=num_classes,
        tabular_dim=tabular_dim,
        fusion_dim=fusion_dim,
        dropout=dropout,
        pretrained=pretrained,
    )