from fastapi import FastAPI, Form, HTTPException, status, Depends
from sqlalchemy import DateTime, create_engine, Column, Boolean, Integer, String, MetaData, Table, ForeignKey, Float, insert
import httpx

### IMPORTS FROM OUR FILES ###
from tokenAuth import create_token, get_current_user, verify_credentials
from picanova import encoded_credentials, fetch_products_from_api, get_product_details_from_api
from database import get_connection, engine
from models import metadata, products_table, products_images_table, product_details_table

app = FastAPI()

PICANOVA_PRODUCTS_URL = "https://api.picanova.com/api/beta/products"

connection = get_connection()

@app.post("/token")
def login(username: str = Form(...), password: str = Form(...)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        if verify_credentials(username, password):
            data = {"sub": username}
            access_token = create_token(data)
            return {"access_token": access_token, "token_type": "bearer"}
        else:
            raise credentials_exception
    except Exception as e:
        return {"message": f"Error : {str(e)}"}

@app.get("/products")
async def get_and_insert_products(current_user: dict = Depends(get_current_user)):
    try:
        products_data = await fetch_products_from_api()
        if products_data:
            await insert_products(products_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
async def insert_products(products_data):
    with engine.connect() as connection:
        for product_data in products_data:
            try:
                product_id = insert_product(connection, product_data)
                insert_product_images(connection, product_id, product_data.get('images', []))
                product_details_data = await get_product_details_from_api(product_id)
                insert_product_details(connection, product_id, product_details_data)
            except Exception as e:
                print(f"Error al insertar el producto {product_data.get('id')}: {e}")

def insert_product(connection, product_data):
    product_id = product_data.get('id')
    name = product_data.get('name')
    sku = product_data.get('sku')
    dpi = product_data.get('dpi')
    product_type = product_data.get('type')

    if product_id is not None:
        ins_product = products_table.insert().values(
            idPicanova=product_id,
            name=name,
            sku=sku,
            dpi=dpi,
            type=product_type
        )
        result = connection.execute(ins_product)
        return result.inserted_primary_key[0]
    else:
        raise ValueError("Product ID is missing")

def insert_product_images(connection, product_id, images_data):
    for image_data in images_data:
        picanova_image_id = image_data.get('id')
        original = image_data.get('original')
        thumb = image_data.get('thumb')

        if picanova_image_id is not None:
            ins_image = products_images_table.insert().values(
                idProduct=product_id,
                idPicanova=picanova_image_id,
                original=original,
                thumb=thumb
            )
            connection.execute(ins_image)
        else:
            print(f"Missing image ID for product {product_id}")

def insert_product_details(connection, product_id, product_details_data):
    for product_detail_data in product_details_data:
        code = product_detail_data.get('code')
        variant_id = product_detail_data.get('variant_id')
        variant_code = product_detail_data.get('variant_code')
        sku=product_detail_data.get('sku')
        name=product_detail_data.get('name')
        format_width=product_detail_data.get('printfile', {}).get('format_width')
        format_height=product_detail_data.get('printfile', {}).get('format_height')
        price=product_detail_data.get('price')
        currency=product_detail_data.get('price_details', {}).get('currency')
        formatted_price=product_detail_data.get('price_details', {}).get('formatted')
        price_in_subunit=product_detail_data.get('price_details', {}).get('in_subunit')

        ins_details = product_details_table.insert().values(
            idProduct=product_id,
            code=code,
            variant_id=variant_id,
            variant_code=variant_code,
            sku=sku,
            name=name,
            format_width=format_width,
            format_height=format_height,
            price=price,
            currency=currency,
            formatted_price=formatted_price,
            price_in_subunit=price_in_subunit
        )

        connection.execute(ins_details)

