# DermaSense Monorepo  
  
Welcome to the DermaSense project repository! This project is organized into three distinct applications/domains for better separation of concerns:  
  
- `frontend/` - Contains the Next.js web application (React, Tailwind CSS).  
- `backend/` - Contains the FastAPI application for processing and inference logic.  
- `ml/` - Contains the machine learning pipeline, data, notebooks, and models (PyTorch/Swin Transformer).  
  
## Quick Start  
You can run the separate parts of the application as follows:  
  
- **Frontend:** Open a terminal in `frontend/`, run `npm i` (if required) and `npm run dev`.  
- **Backend:** Open a terminal in `backend/`, activate your python environment and run `uvicorn app.main:app --reload`.  
  
For domain-specific details, please see the `README.md` files located in each respective directory. 
