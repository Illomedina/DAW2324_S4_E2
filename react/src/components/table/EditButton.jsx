import React from 'react';

const EditButton = (props) => {
  const id = props.data.id;

  const handleSaveClick = async () => {
    // Aquí debes obtener los datos que deseas enviar a la API
    const dataToSend = {
      config: props.data.config,
      value: props.data.value,
      // ... otros datos que necesitas enviar
    };

    try {
      const response = await fetch(`http://localhost:8000/api/settings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      console.log(dataToSend)

      if (response.ok) {
        alert('Datos guardados correctamente');
        // Puedes realizar otras acciones después de guardar, si es necesario
      } else {
        alert('Error al guardar los datos');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud');
    }
  };

  return (
    <span className="total-value-renderer">
      <button onClick={handleSaveClick}>
        Save
      </button>
    </span>
  );
};

export default EditButton;