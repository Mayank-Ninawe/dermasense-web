# DermaSense

DermaSense is a monorepo containing a machine learning pipeline for skin image analysis, a FastAPI inference backend, and a Next.js frontend user interface.

## Project Structure

```text
.
├── backend/         # FastAPI application serving ML predictions
├── frontend/        # Next.js 16 web application (React, Tailwind)
├── ml/              # PyTorch training pipeline, notebooks, and models
└── inspect_model.py # Model inspection utility
```

## Quick Start

### 1. Backend (FastAPI)
The backend exposes the inference API endpoints.

```bash
cd backend
python -m venv .venv

# Activate the virtual environment:
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```
*Note: Create an `.env` file in `backend/` if your configuration requires specific environment variables.*

### 2. Frontend (Next.js)
The frontend provides the user-facing web application.

```bash
cd frontend
npm install
npm run dev
```
*Note: Set up an `.env.local` file in `frontend/` if environment variables are required (e.g., API endpoints).*

### 3. Machine Learning (PyTorch)
The `ml/` directory contains data processing scripts, PyTorch models, and Jupyter notebooks.

```bash
cd ml
python -m venv .venv

# Activate the virtual environment:
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate

pip install -r requirements.txt
```
To explore the data or model training, launch Jupyter:
```bash
jupyter notebook
```

## Git / Repo Notes

Large files, model artifacts, and local environments are intentionally excluded from version control to maintain a lightweight repository. You should expect the following to be ignored by `.gitignore`:
- **Dependencies:** `node_modules/`, `.venv/`, `.next/`
- **Secrets:** `.env`, `.env.local`
- **Data & Artifacts:** Dataset archives (`.zip`), extracted RAW images (`ml/data/raw/DATASET/`), and PyTorch checkpoints (`ml/checkpoints/*.pth`)

When contributing to the ML pipeline, ensure you place any downloaded datasets or checkpoint files in their respective locally ignored directories. 
