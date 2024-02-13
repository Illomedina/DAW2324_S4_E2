import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AgGridTable = ({ rowData, columnDefs }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isEditingEnabled, setIsEditingEnabled] = useState(true); // Nuevo estado

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
    // Puedes agregar lógica adicional aquí según tus necesidades
  };

  const frameworkComponents = {
    toggleEditButton: () => (
      <button onClick={handleToggleEdit}>Toggle Edit</button>
    ),
  };

  const defaultColDef = {
    filter: true,
    editable: isEditingEnabled, // Aquí utilizamos el estado para habilitar o deshabilitar la edición
    flex: 1,
    minWidth: 150,
  };

  return (
    <div className="p-4 border rounded-md">
      <div className="mb-4 flex items-center justify-end">
        <input
          className="border p-2 mr-2 rounded"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={onSearchTextChange}
        />
        <span className="mr-2">
          <strong>Editing:</strong> {isEditingEnabled ? 'Enabled' : 'Disabled'}
        </span>
        <frameworkComponents.toggleEditButton />
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          domLayout='autoHeight'
          defaultColDef={defaultColDef}
          reactiveCustomComponents
          pagination={true}
          editType="fullRow"
        />
      </div>
    </div>
  );
  
};

export default AgGridTable;

