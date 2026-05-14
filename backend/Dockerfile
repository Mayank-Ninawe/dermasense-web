FROM python:3.11-slim

WORKDIR /app

# System deps for Pillow / OpenCV
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY app/ ./app/

# ml/src and ml/config.py must be volume-mounted or copied at runtime
# (checkpoints + processed data are not baked into the image)

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]