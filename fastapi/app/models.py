from sqlalchemy import DateTime, create_engine, Column, Boolean, Integer, String, MetaData, Table, ForeignKey, Float, insert
from datetime import datetime

metadata = MetaData()

### TAULA PRODUCTES ###
products_table = Table(
    'products', metadata,
    Column('id', Integer, primary_key=True),
    Column('idPicanova', String(255)), 
    Column('name', String(255)),
    Column('sku', String(255)),
    Column('dpi', Integer),
    Column('type', String(255)),
    Column('is_active', Boolean, default=False), 
    Column('created_at', DateTime, default=datetime.now),
    Column('updated_at', DateTime, default=datetime.now, onupdate=datetime.now), 
)

### TAULA IMATGES PRODUCTES ###
products_images_table = Table(
    'productImages', metadata,
    Column('idProductImage', Integer),
    Column('original', String(255)),
    Column('thumb', String(255)),
    Column('idProduct', Integer),
    Column('created_at', DateTime, default=datetime.now),
    Column('updated_at', DateTime, default=datetime.now, onupdate=datetime.now),
)

### TAULA DETALLS PRODUCTES ###
product_details_table = Table(
    'productDetails', metadata,
    Column('idProductDetail', Integer),
    Column('idProduct', Integer), 
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