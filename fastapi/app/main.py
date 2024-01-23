from fastapi import FastAPI
import os
from dotenv import load_dotenv
from sqlalchemy import DateTime, create_engine, Column, Boolean, Integer, String, MetaData, Table, ForeignKey, Float, insert
from datetime import datetime

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

load_dotenv()
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")


database_user_uri = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
print ("user ======", {database_user_uri})

engine = create_engine(database_user_uri)

connection = engine.connect()
print("Conexión exitosa a la base de datos.")
# connection.close()

metadata = MetaData()

products_table = Table(
    'products', metadata,
    Column('idProduct', Integer, primary_key=True),
    Column('idPicanova', Integer),  # Asumiendo que es un String, ajusta según sea necesario
    Column('name', String(255)),
    Column('sku', String(255)),
    Column('dpi', Integer),
    Column('type', String(255)),
    Column('is_active', Boolean, default=True),  # Asume un valor predeterminado de True
    Column('created_at', DateTime, default=datetime.now),  # Automáticamente pone la fecha actual al insertar
    Column('updated_at', DateTime, default=datetime.now, onupdate=datetime.now)  # Actualiza automáticamente al modificar
)

