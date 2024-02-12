import React, { useEffect, useState, useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import AppLayout from "../../layout/AppLayout";

const ImageCellRenderer = ({ data }) => {
  return (
    <img
      src={data.thumb}
      style={{ width: 50, height: 50 }}
      alt={`Image for ${data.name}`}
    />
  );
};

const EditProduct = () => {
  return (
    <a x-data="{ tooltip: 'Edite' }" href="#">
      <svg
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="h-6 w-6"
        x-tooltip="tooltip"
      >
        <path
          strokeLinecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    </a>
  );
};

export default function OrdersPage() {
  useEffect(() => {
    fetch("http://localhost:8000/api/orders")
      .then((result) => result.json())
      .then((data) => setRowData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const [rowData, setRowData] = useState([]);
  const ProductIsActive = ({ value }) => (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
      }}
    >
      {
        <img
          alt={`${value}`}
          src={`https://www.ag-grid.com/example-assets/icons/${
            value ? "tick-in-circle" : "cross-in-circle"
          }.png`}
          style={{ width: "auto", height: "auto" }}
        />
      }
    </span>
  );
  const colDefs = [
    {
      field: "thumb",
      headerName: "Image",
      cellRenderer: ImageCellRenderer,
    },
    { field: "name", headerName: "Order Name" },
    {
      field: "is_active",
      headerName: "Is Active",
      width: 120,
      cellRenderer: ProductIsActive,
      field: "boolean",
      cellEditor: "agCheckboxCellEditor",
    },
    {
      headerName: "Actions",
      cellRenderer: EditProduct,
    },
    // Agrega más columnas según sea necesario
  ];

  const defaultColDef = useMemo(() => ({
    filter: true,
    editable: true,
  }));

  return (
    <AppLayout>
      <div
        className="ag-theme-quartz"
        style={{ width: "100%", height: "80vh" }}
      >
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          pagination={true}
          rowSelection="multiple"
        />
      </div>
    </AppLayout>
  );
}
