import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import AppLayout from '../../layout/AppLayout';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    // Estados para los detalles del producto
    const [detailColumnDefs, setDetailColumnDefs] = useState([]);
    const [detailRowData, setDetailRowData] = useState([]);

    // Estados para las imágenes del producto
    const [imageColumnDefs, setImageColumnDefs] = useState([]);
    const [imageRowData, setImageRowData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/products/${productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);

                // Configurar columnas y filas para detalles del producto
                setDetailColumnDefs([
                    { field: 'name', headerName: 'Name', sortable: true, filter: true },
                    { field: 'format_width', headerName: 'Width (cm)', sortable: true, filter: true },
                    { field: 'format_height', headerName: 'Height (cm)', sortable: true, filter: true },
                    { field: 'formatted_price', headerName: 'Price', sortable: true, filter: true },
                ]);
                setDetailRowData(data.product_details);

                // Configurar columnas y filas para imágenes del producto
                setImageColumnDefs([
                    {
                        field: 'thumb',
                        headerName: 'Thumbnail',
                        cellRenderer: params => `<img src="${params.value}" style="width: 50px; height: 50px;" alt="Product Image" />`,
                    },
                    { field: 'original', headerName: 'Original URL', sortable: true, filter: true }
                ]);
                setImageRowData(data.product_images);
            })
            .catch((error) => console.error('Error:', error));
    }, [productId]);

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        resizable: true,
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <AppLayout>
            <div style={{ height: '500px', overflowY: 'auto' }}>
                <div className="ag-theme-quartz" style={{ width: '100%' }}>
                    <h1>{product.name}</h1>
                    <h2>Product Details</h2>
                    <AgGridReact
                        rowData={detailRowData}
                        columnDefs={detailColumnDefs}
                        defaultColDef={defaultColDef}
                        domLayout='autoHeight'
                    />
                    <h2>Product Images</h2>
                    <AgGridReact
                        rowData={imageRowData}
                        columnDefs={imageColumnDefs}
                        defaultColDef={defaultColDef}
                        domLayout='autoHeight'
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default ProductDetailsPage;
