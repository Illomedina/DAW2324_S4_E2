from fastapi import Depends, HTTPException
import httpx, base64

### IMPORTS FROM OUR FILES ###
from tokenAuth import get_current_user

PICANOVA_PRODUCTS_URL = "https://api.picanova.com/api/beta/products"

# Defineix les credencials i les codifica en base64
credentials = 'ai-art-prints-apparel:ab6e8e9e8c2d46a7d8b47913f87d45c5'
encoded_credentials = base64.b64encode(credentials.encode()).decode()

async def fetch_products_from_api():
    try:
        url = PICANOVA_PRODUCTS_URL
      
        async with httpx.AsyncClient() as client:
            response = await client.get(
                url,
                headers={'Authorization': f'Basic {encoded_credentials}'}
            )
            if response.status_code == 200:
                response_data = response.json()
                products_data = response_data.get('data', [])
                return products_data
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")
