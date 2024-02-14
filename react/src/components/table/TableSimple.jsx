import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AgGridTable = ({ rowData, columnDefs }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const handleToggleEdit = () => {
    setIsEditingEnabled(!isEditingEnabled);
  };

  const defaultColDef = {
    filter: true,
    editable: isEditingEnabled,
    flex: 1,
    minWidth: 150,
    paginationPageSize: 15,
    paginationPageSizeSelector: [15, 25, 50, 100],
    rowStyle: { background: 'white', textAlign: 'center' },
  };

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
    gridApi.setQuickFilter(event.target.value);
  };

  return (
    <div className="p-4 border rounded-md relative">
      <div className="mb-4 flex items-center">
        <a href="/settings/create" className="ml-2 bg-green-500 text-white py-2 px-5 rounded cursor-pointer">
          Crear
        </a>  
        <button
          onClick={handleToggleEdit}
          className={`${isEditingEnabled ? 'bg-blue-500' : 'bg-yellow-500'} text-black py-2 px-4 ml-10 rounded cursor-pointer`}
        >
          {isEditingEnabled ? 'Disable Edit' : 'Enabled Edit'}
        </button>
        <span className={`ml-2 text-sm ${isEditingEnabled ? 'text-red-500' : 'text-green-500'}`}>
          <strong>Editing:</strong> {isEditingEnabled ? ' is Enabled' : 'is Disabled'}
        </span> 
      </div>
    
      <div className="absolute top-2 right-4">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={onSearchTextChange}
        />
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          domLayout="autoHeight"
          defaultColDef={defaultColDef}
          pagination={true}
          rowStyle={defaultColDef.rowStyle}
          paginationPageSize={defaultColDef.paginationPageSize}
          editType="fullRow"
        />
      </div>
    </div>
  );
};

export default AgGridTable;
