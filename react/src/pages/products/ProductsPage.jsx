import React, { useEffect, useState, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import AppLayout from '../../layout/AppLayout';
import ButtonFetchAPI from '../../components/ButtonFetchAPI';
import ButtonToggle from '../../components/ButtonToggle';

const ImageCellRenderer = ({ data }) => {
    return <img src={data.thumb} style={{ width: 50, height: 50 }} alt={`Image for ${data.name}`} />;
};

const EditProduct = ({ data }) => {
    return <a href={`/products/${data.id}`}>
        <svg style={{
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            alignItems: 'center',
        }}
            sxmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" /></svg>
    </a>;
}

export default function ProductsPage() {
    const [rowData, setRowData] = useState([]);

    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/api/products')
            .then((result) => result.json())
            .then((data) => setRowData(data))
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    const toggleEditable = () => setIsEditable(!isEditable);

    const defaultColDef = useMemo(() => ({
        filter: true,
        editable: isEditable,
        resizable: true,
    }), [isEditable]);

    const ProductIsActive = props => {
        const { value, context, data } = props;

        const handleChange = async (e) => {
            const checked = e.target.checked;
            try {
                const response = await fetch('http://localhost:8000/api/products/' + data.id, {
                    method: 'PUT', // o 'PUT', dependiendo de tu configuración de API
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ is_active: checked }),
                });

                if (!response.ok) {
                    throw new Error('Error al actualizar el producto');
                }

                // Opcional: Actualizar el estado local o manejar la respuesta
                console.log('Producto actualizado con éxito', await response.json());
            } catch (error) {
                console.error('Error al actualizar el producto', error);
            }
        };

        return (
            <input
                type="checkbox"
                checked={value}
                onChange={handleChange}
                disabled={!context.isEditable}
            />
        );
    };


    const handleCellClicked = (event) => {
        if (event.colDef.field === 'is_active' && isEditable) {
            const newData = rowData.map((row) => {
                if (row.id === event.data.id) {
                    return { ...row, is_active: !row.is_active };
                }
                return row;
            });

            setRowData(newData);
        }
    };

    const PriceRangeCellRenderer = ({ data }) => {
        if (data.product_details && data.product_details.length > 0) {
            const firstFormattedPrice = data.product_details[0].formatted_price;
            const lastFormattedPrice = data.product_details[data.product_details.length - 1].formatted_price;
            return <span>{firstFormattedPrice} - {lastFormattedPrice}</span>;
        }
        return <span>No Price Data</span>;
    };

    const autoSizeStrategy = {
        type: 'fitCellContents'
    };

    const colDefs = useMemo(() => [
        {
            field: 'thumb',
            headerName: 'Image',
            cellRenderer: ImageCellRenderer,
            editable: false,
        },
        {
            field: 'name',
            headerName: 'Product Name',
            editable: false,
        },
        {
            field: 'is_active',
            headerName: 'Active',
            cellRenderer: ProductIsActive,
            cellEditor: 'agCheckboxCellEditor',
            editable: defaultColDef.editable,
        },
        {
            cellRenderer: PriceRangeCellRenderer,
            headerName: 'Price Range',
            editable: false,
        },
        {
            headerName: 'Benefits Margin',
            editable: defaultColDef.editable,
        },
        {
            headerName: 'Sales Price',
            editable: false,
        },
        {
            headerName: 'Actions',
            cellRenderer: EditProduct,
            editable: false,
        }
    ], [isEditable]);

    return (
        <AppLayout Page={"Products"}>
            <div className="ag-theme-quartz" style={{ width: '100%', height: '80vh' }}>
                <ButtonToggle onToggle={toggleEditable} />
                <ButtonFetchAPI />
                <AgGridReact
                    frameworkComponents={{
                        priceRangeCellRenderer: PriceRangeCellRenderer,
                    }}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    columnDefs={colDefs}
                    pagination={true}
                    rowSelection="multiple"
                    context={{ isEditable }}
                    onCellClicked={handleCellClicked}
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>
        </AppLayout>
    );
}
