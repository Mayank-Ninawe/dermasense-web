import os

# ── Paths ──────────────────────────────────────────────────────────────────────
BASE_DIR        = os.path.dirname(os.path.abspath(__file__))
DATA_RAW        = os.path.join(BASE_DIR, "data", "raw")
DATA_PROCESSED  = os.path.join(BASE_DIR, "data", "processed")
DATASET_DIR_0 = os.path.join(DATA_RAW, "DATASET", "DATASET_0", "DATASET_0")
DATASET_DIR_1 = os.path.join(DATA_RAW, "DATASET", "DATASET_1", "DATASET_1")
DATASET_DIR   = DATASET_DIR_0
CHECKPOINTS_DIR = os.path.join(BASE_DIR, "checkpoints")
OUTPUTS_DIR     = os.path.join(BASE_DIR, "outputs")
LOGS_DIR        = os.path.join(OUTPUTS_DIR, "logs")
PLOTS_DIR       = os.path.join(OUTPUTS_DIR, "plots")
HEATMAPS_DIR    = os.path.join(OUTPUTS_DIR, "sample_heatmaps")

# ── CSV Paths ──────────────────────────────────────────────────────────────────
TRAIN_CSV    = os.path.join(DATA_RAW, "train_split.csv")
TEST_CSV     = os.path.join(DATA_RAW, "test_split.csv")
METADATA_CSV = os.path.join(DATA_RAW, "Skin_Metadata.csv")

# ── Column Names (confirmed from EDA) ─────────────────────────────────────────
LABEL_COL      = "Disease_label"
MAIN_CLASS_COL = "Main_class"
IMG_COL        = "Image_name"
FITZPATRICK_COL= "Fitzpatrick"
AGE_COL        = "Age"
SEX_COL        = "Sex"

# Tabular feature groups
BODY_PART_PREFIX  = "Body_part_"
DESCRIPTOR_PREFIX = "Descriptor_"
N_TABULAR_FEATS   = 96   # 49 body + 47 descriptor

# ── Model ──────────────────────────────────────────────────────────────────────
BACKBONE     = "efficientnet_b3"
IMG_SIZE     = 300          # EfficientNet-B3 native resolution
IN_CHANNELS  = 3
TABULAR_DIM  = 96           # input to tabular MLP branch
FUSION_DIM   = 256          # concat fusion hidden size
DROPOUT      = 0.3

# ── Training ───────────────────────────────────────────────────────────────────
BATCH_SIZE    = 24          # 300x300 images + tabular on 6GB VRAM → safe
NUM_EPOCHS    = 40
LR            = 3e-4
WEIGHT_DECAY  = 1e-4
SCHEDULER     = "cosine"
WARMUP_EPOCHS = 5
SEED          = 42

# Loss function
LABEL_SMOOTHING = 0.1   # already set implicitly — add explicitly
USE_CLASS_WEIGHTS = True

# ── Augmentation ───────────────────────────────────────────────────────────────
TRAIN_AUG = True
VAL_AUG   = False

# ── Hardware ───────────────────────────────────────────────────────────────────
DEVICE      = "cuda"
NUM_WORKERS = 2             # keep ≤2 on Windows
PIN_MEMORY  = True

# ── Validation Split ───────────────────────────────────────────────────────────
VAL_SPLIT = 0.15

# ── Checkpoints ───────────────────────────────────────────────────────────────
SAVE_BEST_ONLY = True
BEST_MODEL  = os.path.join(CHECKPOINTS_DIR, "best_model.pth")
LAST_MODEL  = os.path.join(CHECKPOINTS_DIR, "last_model.pth")