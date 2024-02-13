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

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
    gridApi.setQuickFilter(event.target.value);
  };

  const handleToggleEdit = () => {
    setIsEditingEnabled(!isEditingEnabled);
  };

  const defaultColDef = {
    filter: true,
    editable: isEditingEnabled,
    flex: 1,
    minWidth: 150,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50, 100],
    rowStyle: { background: 'white', textAlign: 'center' },
  };

  return (
    <div className="p-4 border rounded-md">
      <div className="mb-4 flex items-center">
        <button
          onClick={handleToggleEdit}
          className={`bg-${isEditingEnabled ? 'blue' : 'yellow'}-500 text-white py-2 px-4 rounded cursor-pointer`}
        >
          {isEditingEnabled ? 'Disable Edit' : 'Toggle Edit'}
        </button>
        <span className={`ml-2 text-sm ${isEditingEnabled ? 'text-red-500' : 'text-green-500'}`}>
          <strong>Editing:</strong> {isEditingEnabled ? 'Enabled' : 'Disabled'}
        </span>
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
