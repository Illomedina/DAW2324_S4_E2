import React, { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';

const ImageCellRenderer = ({ data }) => {
    return data.product_images && data.product_images.length > 0 ? (
        <img src={data.product_images[0].thumb} style={{ width: 50, height: 50 }} alt={data.name} />
    ) : (
        <span>No Image</span>
    );
};

export default function ProductsPage() {
    const [rowData, setRowData] = useState([]);
    const MissionResultRenderer = ({ value }) => (
        <span
            style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
                alignItems: 'center',
            }}
        >
            {
                <img
                    alt={`${value}`}
                    src={`https://www.ag-grid.com/example-assets/icons/${value ? 'tick-in-circle' : 'cross-in-circle'
                        }.png`}
                    style={{ width: 'auto', height: 'auto' }}
                />
            }
        </span>
    );
    const colDefs = [
        {
            field: 'product_images',
            headerName: 'Image',
            cellRendererFramework: ImageCellRenderer,
        },
        { field: 'name', headerName: 'Product Name' },
        { field: 'sku', headerName: 'SKU' },
        { field: 'dpi', headerName: 'DPI' },
        { field: 'type', headerName: 'Type' }, {
            field: 'is active',
            width: 120,
            cellRenderer: MissionResultRenderer,
        }
        // Agrega más columnas según sea necesario
    ];

    useEffect(() => {
        fetch('http://localhost:8000/api/products')
            .then((result) => result.json())
            .then((data) => setRowData(data))
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div className="ag-theme-quartz" style={{ width: '100%', height: '600px' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                pagination={true}
                rowSelection="multiple"
            />
        </div>
    );
}
