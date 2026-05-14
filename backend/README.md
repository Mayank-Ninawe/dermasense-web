# DermaSense Backend

This directory contains the FastAPI application backend for DermaSense.

## Setup & Running

1. Open your terminal in this directory (`cd backend`).
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the development server (make sure you're in the `backend/` directory):
   ```bash
   uvicorn app.main:app --reload
   ```

The application will be accessible at `http://127.0.0.1:8000`.

*Note: The backend depends on some model structures exported in `../ml/src` for inference. Ensure path dependencies remain intact.*