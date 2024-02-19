import React, { useEffect, useState, useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import AppLayout from "../../layout/AppLayout";
import { Link } from "react-router-dom";

const EditOrder = ({ data }) => {
  return (
    <a href={`/orders/${data.id}`}>
      <svg
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
        }}
        sxmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" />
      </svg>
    </a>
  );
};
export default function OrdersPage() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/orders`)
      .then((result) => result.json())
      .then((data) => setRowData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const [rowData, setRowData] = useState([]);
  const colDefs = [
    {
      field: "idOrderPicanova",
      headerName: "Order ID",
      cellRenderer: undefined,
    },
    {
      field: "idCustomer",
      headerName: "Customer ID",
      cellRenderer: undefined,
    },
    {
      field: "datetime",
      headerName: "Order Date",
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      cellRenderer: undefined,
    },
    {
      headerName: "Details",
      cellRenderer: EditOrder,
    },
  ];

  const defaultColDef = useMemo(() => ({
    filter: true,
    editable: false,
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
