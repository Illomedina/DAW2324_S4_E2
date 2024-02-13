import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AgGridTable = ({ rowData, columnDefs }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isEditingEnabled, setIsEditingEnabled] = useState(false); // Nuevo estado

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
      <div className="flex items-center"> {/* Nuevo contenedor para alinear elementos verticalmente */}
        <button
          onClick={handleToggleEdit}
          className="bg-blue-500 text-white py-2 px-4 rounded" // Estilo de botón azul
        >
          Toggle Edit
        </button>
        <span className="ml-2">
          <strong>Editing:</strong> {isEditingEnabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>
    ),
  };

  const defaultColDef = {
    filter: true,
    editable: isEditingEnabled, // Aquí utilizamos el estado para habilitar o deshabilitar la edición
    flex: 1,
    minWidth: 150,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50,100],
  };

  return (
    <div className="p-4 border rounded-md">
      <div className="mb-4 flex items-start justify-between">
        <frameworkComponents.toggleEditButton />
        <div className="flex items-end">
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={onSearchTextChange}
          />
        </div>
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
          paginationPageSize={defaultColDef.paginationPageSize}
          editType="fullRow"
        />
      </div>
    </div>
  );
  
};

export default AgGridTable;

