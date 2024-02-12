import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';

export const CustomersTable = ({ customers }) => {

  const colDefs = [
    { field: 'name', headerName: 'Name' },
    { field: 'mail', headerName: 'Email' },
    { field: 'username', headerName: 'Username' },
    { field: 'postcode', headerName: 'PostalCode' },
    { field: 'is_validated', headerName: 'Validated' },
    { field: 'customerStatus', headerName: 'Status' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'address', headerName: 'Address' },
  ];

  return (
    
    <div className="ag-theme-quartz" style={{ width: 'auto', height: '80vh' }}>
      <AgGridReact
        rowData={customers}
        columnDefs={colDefs}
        pagination={true}
        rowSelection="multiple"
      />
    </div>
  )
}
