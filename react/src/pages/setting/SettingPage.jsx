// SettingPage.js
import React, { useState, useEffect, useMemo } from 'react';
import AgGridTable from '../../components/table/TableSimple';
import AppLayout from '../../layout/AppLayout';
import EditButton from '../../components/table/EditButton';
import DeleteButton from '../../components/table/DeleteButton';


const SettingPage = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/settings');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const columnDefs = [
    { headerName: 'Nom', field: 'config' },
    { headerName: 'value', field: 'value' },
    {
      headerName: 'Edit',
      cellRenderer: EditButton,
    },
    {
      headerName: 'Delete',
      cellRenderer: DeleteButton,
    },
  ];

  return (
    <AppLayout>
      <div>
        <AgGridTable
          rowData={jsonData}
          columnDefs={columnDefs}
        />
      </div>
    </AppLayout>
  );
};

export default SettingPage;
