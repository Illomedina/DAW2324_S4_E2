from fastapi import FastAPI

from sqlalchemy import DateTime, create_engine, Column, Boolean, Integer, String, MetaData, Table, ForeignKey, Float, insert
from datetime import datetime

from database import get_connection 

app = FastAPI()

@app.get("/")
async def root():
    connection = get_connection()  # Usa la función para obtener una conexión
    # Aquí puedes realizar operaciones con la base de datos usando `connection`
    return {"message": "Hola, FastAPI con conexión a base de datos!"}

# connection.close()

metadata = MetaData()

### TAULA PRODUCTES ###
products_table = Table(
    'products', metadata,
    Column('idProduct', Integer, primary_key=True),
    Column('idPicanova', Integer),  # Asumiendo que es un String, ajusta según sea necesario
    Column('name', String(255)),
    Column('sku', String(255)),
    Column('dpi', Integer),
    Column('type', String(255)),
    Column('is_active', Boolean, default=False),  # Asume un valor predeterminado de True
    Column('created_at', DateTime, default=datetime.now),  # Automáticamente pone la fecha actual al insertar
    Column('updated_at', DateTime, default=datetime.now, onupdate=datetime.now),  # Actualiza automáticamente al modificar
)

### TAULA IMATGES PRODUCTES ###
products_images_table = Table(
    'productImages', metadata,
    Column('idProductImage', Integer),
    Column('original', String(255)),
    Column('thumb', String(255)),
    Column('idProduct', Integer),
)

### TAULA DETALLS PRODUCTES ###
product_details_table = Table(
    'productDetails', metadata,
    Column('idProductDetail', Integer),
    Column('idProduct', Integer),  # Clave foránea que apunta al ID del producto
    Column('code', String(255)),
    Column('variant_id', Integer),
    Column('variant_code', String(255)),
    Column('sku', String(255)),
    Column('name', String(255)),
    Column('format_width', Integer),
    Column('format_height', Integer),
    Column('price', Float),
    Column('currency', String(3)),
    Column('formatted_price', String(20)),
    Column('price_in_subunit', Integer),
)