import os, json, sys
import numpy as np
from PIL import Image
import torch
import albumentations as A
from albumentations.pytorch import ToTensorV2

# ml/src ko path mein add karo
ML_SRC = os.path.join(os.path.dirname(__file__), "..", "..", "ml", "src")
ML_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "ml")
sys.path.insert(0, ML_SRC)
sys.path.insert(0, ML_DIR)

from model import build_model
from config import (
    BEST_MODEL, TABULAR_DIM, FUSION_DIM, DROPOUT,
    IMG_SIZE, BODY_PART_PREFIX, DESCRIPTOR_PREFIX,
    CHECKPOINTS_DIR
)

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# ── Label maps ────────────────────────────────────────────────────────────────
_ML_DATA = os.path.join(os.path.dirname(__file__), "..", "..", "ml", "data", "processed")

with open(os.path.join(_ML_DATA, "label2idx.json")) as f:
    LABEL2IDX: dict[str, int] = json.load(f)

with open(os.path.join(_ML_DATA, "idx2label.json")) as f:
    IDX2LABEL: dict[str, str] = {int(k): v for k, v in json.load(f).items()}

NUM_CLASSES = len(LABEL2IDX)

# ── 96 tabular column names (sorted, same order as dataset.py) ────────────────
_BODY_COLS = sorted([
    "Body_part_Armpits (Axillary Region)",
    "Body_part_Back",
    "Body_part_Back of the Knees (Popliteal Region)",
    "Body_part_Breasts (Mammary Region)",
    "Body_part_Calves (Sural Region)",
    "Body_part_Genital Area (Pubic Region)",
    "Body_part_Groin (Inguinal Region)",
    "Body_part_Head Cheeks",
    "Body_part_Head Chin",
    "Body_part_Head Ears",
    "Body_part_Head Eye",
    "Body_part_Head Forehead",
    "Body_part_Head Lips",
    "Body_part_Head Nose",
    "Body_part_Head Scalp",
    "Body_part_Head Temples",
    "Body_part_Lower Extremities Ankles (Tarsal Region)",
    "Body_part_Lower Extremities Feet (Pedal Region)",
    "Body_part_Lower Extremities Feet (Pedal Region) Toes (Digits)",
    "Body_part_Lower Extremities Hips (Coxal Region)",
    "Body_part_Lower Extremities Knees (Patellar Region)",
    "Body_part_Lower Extremities Lower Legs",
    "Body_part_Lower Extremities Lower Legs (Crural Region)",
    "Body_part_Lower Extremities Soles (Plantar Region)",
    "Body_part_Lower Extremities Thighs (Femoral Region)",
    "Body_part_Lower Extremities Toes (Digits)",
    "Body_part_LowerBack (Lumbus)",
    "Body_part_Mucous Membranes Oral Cavity",
    "Body_part_Nails Fingernails",
    "Body_part_Nails Toenails",
    "Body_part_Navel (Umbilicus)",
    "Body_part_Neck",
    "Body_part_Palms",
    "Body_part_Perianal Area",
    "Body_part_Tongue",
    "Body_part_Trunk Abdomen",
    "Body_part_Trunk Abdomen Navel (Umbilicus)",
    "Body_part_Trunk Abdomen anterior",
    "Body_part_Trunk Abdomen posterior",
    "Body_part_Trunk Back (Dorsum)",
    "Body_part_Trunk Buttocks (Gluteal Region)",
    "Body_part_Trunk Chest (Thorax)",
    "Body_part_Upper Extremities Elbows",
    "Body_part_Upper Extremities Forearms (Antebrachium)",
    "Body_part_Upper Extremities Hands (Manus)",
    "Body_part_Upper Extremities Hands (Manus) Fingers (Digits)",
    "Body_part_Upper Extremities Shoulders",
    "Body_part_Upper Extremities Upper Arms (Brachium)",
    "Body_part_Upper Extremities Wrists (Carpus)",
])

_DESC_COLS = sorted([
    "Descriptor_Abscess",
    "Descriptor_Acuminate",
    "Descriptor_Atrophy",
    "Descriptor_Brown (Hyperpigmentation)",
    "Descriptor_Bulla",
    "Descriptor_Burrow",
    "Descriptor_Comedo",
    "Descriptor_Crust",
    "Descriptor_Cyst",
    "Descriptor_Dilated Vein",
    "Descriptor_Discolored Nail",
    "Descriptor_Edema",
    "Descriptor_Erosion",
    "Descriptor_Erythema",
    "Descriptor_Excoriation",
    "Descriptor_Exophytic/Fungating",
    "Descriptor_Exudate",
    "Descriptor_Fissure",
    "Descriptor_Flat-topped",
    "Descriptor_Gray",
    "Descriptor_Hair Patch",
    "Descriptor_Hyperkeratotic plaques",
    "Descriptor_Induration",
    "Descriptor_Lichenification",
    "Descriptor_Macule",
    "Descriptor_Nodule",
    "Descriptor_Papule",
    "Descriptor_Patch",
    "Descriptor_Pedunculated",
    "Descriptor_Pigmented",
    "Descriptor_Pitted Nail",
    "Descriptor_Plaque",
    "Descriptor_Poikiloderma",
    "Descriptor_Purpura/Petechiae",
    "Descriptor_Pustule",
    "Descriptor_Salmon",
    "Descriptor_Scale",
    "Descriptor_Scar",
    "Descriptor_Striae",
    "Descriptor_Telangiectasia",
    "Descriptor_Ulcer",
    "Descriptor_Vesicle",
    "Descriptor_Warty",
    "Descriptor_Wheal",
    "Descriptor_White (Hypopigmentation)",
    "Descriptor_Xerosis",
    "Descriptor_Yellow",
])

TAB_COLS = _BODY_COLS + _DESC_COLS   # length = 96, same order as get_tabular_cols()

# ── Symptom → Descriptor mapping ─────────────────────────────────────────────
# AnalyzeForm ke symptomOptions → closest Descriptor_ columns
SYMPTOM_TO_DESCRIPTOR: dict[str, list[str]] = {
    "Itching":       ["Descriptor_Excoriation", "Descriptor_Xerosis"],
    "Pain":          ["Descriptor_Erosion", "Descriptor_Ulcer"],
    "Bleeding":      ["Descriptor_Purpura/Petechiae", "Descriptor_Erosion"],
    "Color change":  ["Descriptor_Brown (Hyperpigmentation)", "Descriptor_White (Hypopigmentation)"],
    "Size increase": ["Descriptor_Nodule", "Descriptor_Plaque"],
    "Scaling":       ["Descriptor_Scale", "Descriptor_Hyperkeratotic plaques"],
    "Discharge":     ["Descriptor_Exudate", "Descriptor_Pustule"],
    "None":          [],
}

# ── Body location → Body_part_ mapping ───────────────────────────────────────
LOCATION_TO_BODY: dict[str, list[str]] = {
    "Face":   ["Body_part_Head Cheeks", "Body_part_Head Forehead",
               "Body_part_Head Chin", "Body_part_Head Nose"],
    "Scalp":  ["Body_part_Head Scalp"],
    "Neck":   ["Body_part_Neck"],
    "Chest":  ["Body_part_Trunk Chest (Thorax)"],
    "Back":   ["Body_part_Back", "Body_part_Trunk Back (Dorsum)"],
    "Arm":    ["Body_part_Upper Extremities Upper Arms (Brachium)",
               "Body_part_Upper Extremities Forearms (Antebrachium)"],
    "Hand":   ["Body_part_Upper Extremities Hands (Manus)"],
    "Leg":    ["Body_part_Lower Extremities Thighs (Femoral Region)",
               "Body_part_Lower Extremities Lower Legs (Crural Region)"],
    "Foot":   ["Body_part_Lower Extremities Feet (Pedal Region)",
               "Body_part_Lower Extremities Soles (Plantar Region)"],
    "Other":  [],
}

# ── Fitzpatrick mapping ───────────────────────────────────────────────────────
FITZPATRICK_MAP: dict[str, float] = {
    "I-II":  2.0,
    "III":   3.0,
    "IV":    4.0,
    "V-VI":  5.0,
}

# ── Age range → midpoint ─────────────────────────────────────────────────────
def _age_to_midpoint(age: int) -> str:
    """Convert numeric age from form → dataset Age range string."""
    if age <= 10:   return "0 - 10"
    if age <= 20:   return "11 - 20"
    if age <= 40:   return "21 - 40"
    if age <= 60:   return "41 - 60"
    return "61 - 90"


# ── Image preprocessing (val transforms, no augmentation) ────────────────────
_TRANSFORM = A.Compose([
    A.Resize(height=IMG_SIZE, width=IMG_SIZE),
    A.Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)),
    ToTensorV2(),
])


def preprocess_image(pil_image: Image.Image) -> torch.Tensor:
    img = np.array(pil_image.convert("RGB"))
    return _TRANSFORM(image=img)["image"].unsqueeze(0)  # (1, 3, 300, 300)


def build_tabular_vector(
    body_location: str,
    symptoms: list[str],
) -> torch.Tensor:
    """
    Build (1, 96) tabular tensor.
    Only Body_part_* and Descriptor_* columns — matches get_tabular_cols().
    Age, Fitzpatrick, Sex are NOT in the 96 tabular cols.
    """
    vec = np.zeros(len(TAB_COLS), dtype=np.float32)

    # Set body part columns
    for col in LOCATION_TO_BODY.get(body_location, []):
        if col in TAB_COLS:
            vec[TAB_COLS.index(col)] = 1.0

    # Set descriptor columns from symptoms
    for symptom in symptoms:
        for col in SYMPTOM_TO_DESCRIPTOR.get(symptom, []):
            if col in TAB_COLS:
                vec[TAB_COLS.index(col)] = 1.0

    return torch.tensor(vec, dtype=torch.float32).unsqueeze(0)  # (1, 96)


# ── Model loader (singleton) ──────────────────────────────────────────────────
_model = None

def get_model() -> torch.nn.Module:
    global _model
    if _model is None:
        _model = build_model(
            num_classes=NUM_CLASSES,
            tabular_dim=TABULAR_DIM,
            fusion_dim=FUSION_DIM,
            dropout=DROPOUT,
            pretrained=False,
        )

        checkpoint = torch.load(BEST_MODEL, map_location=DEVICE, weights_only=False)

        if "model_state" in checkpoint:
            state = checkpoint["model_state"]
        elif "model_state_dict" in checkpoint:
            state = checkpoint["model_state_dict"]
        elif "state_dict" in checkpoint:
            state = checkpoint["state_dict"]
        else:
            state = checkpoint

        _model.load_state_dict(state, strict=True)
        _model.to(DEVICE)
        _model.eval()

    return _model


# ── Main inference function ───────────────────────────────────────────────────
@torch.no_grad()
def run_inference(
    pil_image: Image.Image,
    body_location: str,
    symptoms: list[str],
    top_k: int = 3,
) -> dict:
    model = get_model()

    img_tensor = preprocess_image(pil_image).to(DEVICE)
    tab_tensor = build_tabular_vector(body_location, symptoms).to(DEVICE)

    logits = model(img_tensor, tab_tensor)           # (1, num_classes)
    probs  = torch.softmax(logits, dim=1)[0]         # (num_classes,)

    top_probs, top_idxs = torch.topk(probs, k=min(top_k, NUM_CLASSES))

    top_k_results = [
        {
            "condition": IDX2LABEL[idx.item()],
            "confidence": round(prob.item() * 100, 2),
        }
        for prob, idx in zip(top_probs, top_idxs)
    ]

    primary = top_k_results[0]
    return {
        "primary_condition": primary["condition"],
        "primary_confidence": primary["confidence"],
        "differentials": top_k_results,        # includes primary at index 0
    }