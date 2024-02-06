FROM python:3.11-buster

WORKDIR /app

COPY /app /app

COPY requirements.txt /app/requirements.txt

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 8003

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8003", "--reload"]

