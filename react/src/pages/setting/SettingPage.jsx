import React,  { useState, useEffect } from 'react';
import AgGridTable from '../../components/table/TableSimple';
import AppLayout from '../../layout/AppLayout';

const SettingPage = () => {
        const [jsonData, setJsonData] = useState([]);      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:8000/api');
              const data = await response.json();
              setJsonData(data);
            } catch (error) {
              console.error('Error loading data:', error);
            }
        };
      
        fetchData();
}, []);

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Nom', field: 'config' },
    { headerName: 'value', field: 'value' },

    // ... otras definiciones de columna
  ];

  return (
    <AppLayout>
        <div>
          <AgGridTable rowData={jsonData} columnDefs={columnDefs} />
        </div>
    </AppLayout>
    
  );
};

export default SettingPage;

