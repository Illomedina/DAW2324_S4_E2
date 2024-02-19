import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import ButtonToggle from '../ButtonToggle';
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
        <a href="/settings/create" className="inline-flex justify-center rounded-md bg-indigo-400 px-3 py-2 text-md font-semibold text-white shadow-sm
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-gray-900 mr-4">
          Create
        </a>  
        <ButtonToggle
          isEditingEnabled={isEditingEnabled}
          onToggleEdit={handleToggleEdit}
        />
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
