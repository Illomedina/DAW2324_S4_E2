import React, { useState, useEffect } from 'react';
import AgGridTable from '../../components/tables/TableSimple';
import AppLayout from '../../layout/AppLayout';

const User = () => {
        const [userData, setUsersData] = useState([]);     

        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('https://thronesapi.com/api/v2/Characters');
              const data = await response.json();
              setUsersData(data);
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
    { headerName: 'Username', field: 'user' },
    { headerName: 'Email', field: 'email' },

  ];

  return (
    <AppLayout>
        <div>
          <AgGridTable rowData={userData} columnDefs={columnDefs} />
        </div>
    </AppLayout>
    
  );
};

export default User;

