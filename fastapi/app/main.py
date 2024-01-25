from fastapi import FastAPI, Form, HTTPException, status, Depends
from sqlalchemy import DateTime, create_engine, Column, Boolean, Integer, String, MetaData, Table, ForeignKey, Float, insert
import httpx

### IMPORTS FROM OUR FILES ###
from tokenAuth import create_token, get_current_user, verify_credentials
from picanova import encoded_credentials, fetch_products_from_api
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
        response_data = await fetch_products_from_api()

        if isinstance(response_data, list):
            #Accede a la lista de productos dentro de la clave 'data'
            products_data = response_data

            with engine.connect() as connection:
                for product_data in products_data:
                    product_id = product_data.get('id')
                    name = product_data.get('name')
                    # variants = product_data.get('variants')
                    sku = product_data.get('sku')
                    dpi = product_data.get('dpi')
                    product_type = product_data.get('type')

                    if product_id is not None:
                        ins_product = products_table.insert().values(
                            idPicanova=product_id,
                            name=name,
                            # variants=variants,
                            sku=sku,
                            dpi=dpi,
                            type=product_type
                        )
                        print(f'lo product id es:     {product_id}')
                        # Ejecuta la sentencia de inserción del producto
                        result = connection.execute(ins_product)
                                # product_id = result.lastrowid  # Obtiene el ID del producto insertado
                                # product_id = result.inserted_primary_key[0]
                                # print(f'lo product id es:     {product_id}')

                                # # Itera sobre la lista de imágenes y realiza la inserción en la base de datos
                                # images_data = product_data.get('images', [])
                                # for image_data in images_data:
                                #     image_id = image_data.get('id')
                                #     original = image_data.get('original')
                                #     thumb = image_data.get('thumb')

                                #     # Realiza la inserción de la imagen en la base de datos
                                #     ins_image = products_images_table.insert().values(
                                #         idProductImage=image_id,
                                #         original=original,
                                #         thumb=thumb,
                                #         idProduct=product_id
                                #     )

                                #     # Ejecuta la sentencia de inserción de la imagen
                                #     connection.execute(ins_image)

                    #             product_details_data = await get_product_details_from_api(product_id, encoded_credentials)

                    #             for product_detail_data in product_details_data:
                    #                 id = product_detail_data.get('id')
                    #                 code = product_detail_data.get('code')
                    #                 variant_id = product_detail_data.get('variant_id')
                    #                 variant_code = product_detail_data.get('variant_code')
                    #                 sku=product_detail_data.get('sku')
                    #                 name=product_detail_data.get('name')
                    #                 format_width=product_detail_data.get('printfile', {}).get('format_width')
                    #                 format_height=product_detail_data.get('printfile', {}).get('format_height')
                    #                 price=product_detail_data.get('price')
                    #                 currency=product_detail_data.get('price_details', {}).get('currency')
                    #                 formatted_price=product_detail_data.get('price_details', {}).get('formatted')
                    #                 price_in_subunit=product_detail_data.get('price_details', {}).get('in_subunit')
                    #                 options_data = product_detail_data.get('options', {})

                    #                 if options_data:  # Check if options_data_list is not empty
                    #                     for option_id, option_data  in options_data.items():
                    #                         print(f"Option ID: {option_id}, Option Data: {option_data}")
                    #                 else:
                    #                     print("No options data available.")               

                    #                 # if options_data is not None:

                    #                 #     for option_id, option_data in options_data.items():
                    #                 #         print(f"Option ID: {option_id}, Option Data: {option_data}")
                    #                 # print(f'La ID del {product_id} es: {id} ...... correspon a {code}???¿¿¿')
                                    

                    #                 ins_details = product_details_table.insert().values(
                    #                     idProductDetail=id,
                    #                     idProduct=product_id,
                    #                     code=code,
                    #                     variant_id=variant_id,
                    #                     variant_code=variant_code,
                    #                     sku=sku,
                    #                     name=name,
                    #                     format_width=format_width,
                    #                     format_height=format_height,
                    #                     price=price,
                    #                     currency=currency,
                    #                     formatted_price=formatted_price,
                    #                     price_in_subunit=price_in_subunit
                    #                 )

                    #                 connection.execute(ins_details)
                                        


                    # return {"message": "IDs de productos insertados en la base de datos"}

            #     else:
            #         # Si la respuesta no es un diccionario, lanza una excepción
            #         raise HTTPException(status_code=500, detail="La respuesta de la API no es válida")

            # else:
            #     # Si la respuesta no es exitosa, lanza una excepción HTTP con el detalle del error
            #     raise HTTPException(status_code=400, detail=f"Error en la solicitud GET: {response.text}")

    except Exception as e:
        # Captura y registra el error
        print(f"Error: {str(e)}")

        # Lanza una excepción HTTP con un mensaje genérico
        raise HTTPException(status_code=500, detail="Error interno del servidor")

# async def get_product_images_from_api(product_id: int, encoded_credentials: str) -> dict:
#     url = (f"{PICANOVA_BASE_URL}api/beta/products/{product_id}")
#     async with httpx.AsyncClient() as client:
#         response = await client.get(
#             url,
#             headers={'Authorization': f'Basic {encoded_credentials}'}
#         )
#         if response.status_code == 200:
#             return response.json().get('data', {})
#         return {}