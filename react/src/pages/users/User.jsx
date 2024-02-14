import React, { useState, useEffect } from 'react';
import AgGridTable from '../../components/table/TableSimple';
import AppLayout from '../../layout/AppLayout';
import EditButton from '../../components/table/EditButton';
import DeleteButton from '../../components/table/DeleteButton';

const User = () => {
        const [userData, setUsersData] = useState([]);     

        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:8000/api/users');
              const data = await response.json();
              setUsersData(data);
            } catch (error) {
              console.error('Error loading data:', error);
            }
        };
      
        fetchData();
}, []);

  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Surname', field: 'surname' },
    { headerName: 'Username', field: 'user' },
    { headerName: 'Email', field: 'email' },

  {  headerName: 'Edit',
    cellRenderer: EditButton,
    editable: false,
    cellStyle: { 'fontWeight': 'bold', 'color': 'green', } 
  },
  {
    headerName: 'Delete',
    cellRenderer: DeleteButton,
    editable: false,
    cellStyle: { 'fontWeight': 'bold', 'color': 'red', } 

  },
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

