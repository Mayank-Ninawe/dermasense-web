import torch
import traceback
import sys

try:
    print("Loading checkpoint...")
    ckpt = torch.load(r'd:\dermasense-web\ml\checkpoints\best_model.pth', map_location='cpu')
    print("Type:", type(ckpt))
    
    if isinstance(ckpt, dict):
        print("Top-level keys:", list(ckpt.keys()))
        state_dict = ckpt.get('state_dict', ckpt.get('model_state_dict', ckpt))
    else:
        state_dict = ckpt

    print("\nFirst 20 param names in state_dict:")
    for k in list(state_dict.keys())[:20]:
        print(" -", k)

except Exception as e:
    print("Error:", e)
    traceback.print_exc()
