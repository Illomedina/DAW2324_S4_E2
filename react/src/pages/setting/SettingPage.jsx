import React from 'react';
import AgGridTable from '../../components/table/TableSimple';
import AppLayout from '../../layout/AppLayout';

const SettingPage = () => {
  const rowData = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    // ... otros datos
  ];

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Age', field: 'age' },
    // ... otras definiciones de columna
  ];

  return (
    <AppLayout>
        <div>
          <AgGridTable rowData={rowData} columnDefs={columnDefs} />
        </div>
    </AppLayout>
    
  );
};

export default SettingPage;

