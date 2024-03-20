import React, { useEffect, useState, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import AppLayout from '../../layout/AppLayout';
import ButtonFetchProductsAPI from '../../components/ButtonFetchProductsAPI';
import ButtonToggle from '../../components/ButtonToggle';
import { PriceRangeCellRenderer } from '../../components/tables/products/cellRenderers/PriceRangeCellRenderer';
import { ImageCellRenderer } from '../../components/tables/products/cellRenderers/ImageCellRenderer';
import { EditProductCellRenderer } from '../../components/tables/products/cellRenderers/EditProductCellRenderer';
import { ProductIsActiveCellRenderer } from '../../components/tables/products/cellRenderers/ProductIsActiveCellRenderer';
import Spinner from '../../components/Spinner';
const steps = [
    { name: 'Products', href: '/products', current: true },
]

export default function ProductsPage() {
    const [rowData, setRowData] = useState([]);

    const [isEditable, setIsEditable] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products`)
            .then((result) => result.json())
            .then((data) => {
                setRowData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setIsLoading(false);
            });
    }, []);

    const toggleEditable = () => setIsEditable(!isEditable);

    const defaultColDef = useMemo(() => ({
        filter: true,
        editable: isEditable,
        resizable: true,
    }), [isEditable]);

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

    function calculateSalesPrice(priceInSubunit, benefitsMarginPercentage) {
        const benefitsMargin = benefitsMarginPercentage / 100;
        const salesPrice = priceInSubunit + (priceInSubunit * benefitsMargin);
        return (salesPrice / 100).toFixed(2) + ' €';
    }

    function benefitsMarginValueGetter(params) {
        if (params.data.product_details && params.data.product_details.length > 0) {
            return params.data.product_details[0].benefits_margin + " %";
        }
        return null;
    }

    const SalesPriceCellRenderer = ({ data }) => {
        if (data.product_details && data.product_details.length > 0) {
            const benefitsMargin = data.product_details[0].benefits_margin;
            const firstPrice = calculateSalesPrice(data.product_details[0].price_in_subunit, benefitsMargin);
            const lastPrice = calculateSalesPrice(data.product_details[data.product_details.length - 1].price_in_subunit, benefitsMargin);
            return <span>{firstPrice} - {lastPrice}</span>;
        }
        return <span>No Price Data</span>;
    };

    const autoSizeStrategy = {
        type: 'fitCellContents'
    };

    const colDefs = useMemo(() => [
        {
            cellRenderer: ImageCellRenderer,
            field: 'thumb',
            headerName: 'Image',
            editable: false,
        },
        {
            field: 'name',
            headerName: 'Product Name',
            editable: false,
        },
        {
            cellRenderer: ProductIsActiveCellRenderer,
            field: 'is_active',
            headerName: 'Active',
            cellEditor: 'agCheckboxCellEditor',
            editable: defaultColDef.editable,
        },
        {
            cellRenderer: PriceRangeCellRenderer,
            headerName: 'Price Range',
            editable: false,
        },
        {
            headerName: "Benefits Margin",
            valueGetter: benefitsMarginValueGetter,
            valueSetter: (params) => {
                if (params.data.product_details && params.data.product_details.length > 0) {
                    const newValue = parseFloat(params.newValue.replace(' %', ''));
                    if (!isNaN(newValue) && params.data.product_details[0].benefits_margin !== newValue) {
                        params.data.product_details[0].benefits_margin = newValue;
                        return true;
                    }
                }
                return false;
            },
            editable: defaultColDef.editable,
        },
        {
            cellRenderer: SalesPriceCellRenderer,
            headerName: 'Sales Price',
            editable: false,
        },
        {
            cellRenderer: EditProductCellRenderer,
            headerName: 'Actions',
            editable: false,
        }
    ], [isEditable]);

    return (
        <AppLayout Page={"Products"} Steps={steps}>
            <div className="flex justify-end">
                <ButtonToggle onToggle={toggleEditable} />
                {/* <ButtonFetchProductsAPI /> */}
            </div>
            <div className="ag-theme-quartz" style={{ width: '100%', height: '80vh' }}>
                {isLoading
                    ? <Spinner message='Loading Products...' /> // Asegúrate de tener un componente Spinner para mostrarlo aquí
                    : (
                        <>
                            <AgGridReact
                                rowData={rowData}
                                defaultColDef={defaultColDef}
                                columnDefs={colDefs}
                                pagination={true}
                                rowSelection="multiple"
                                context={{ isEditable }}
                                onCellClicked={handleCellClicked}
                                autoSizeStrategy={autoSizeStrategy}
                            />
                        </>
                    )}
            </div>
        </AppLayout>
    );
};