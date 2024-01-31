import React,  { useState, useEffect } from 'react';
import AgGridTable from '../../components/table/TableSimple';
import AppLayout from '../../layout/AppLayout';

const SettingPage = () => {
        const [jsonData, setJsonData] = useState([]);      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('https://thronesapi.com/api/v2/Characters');
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
    { headerName: 'Name', field: 'firstName' },
    { headerName: 'Surname', field: 'lastName' },

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

