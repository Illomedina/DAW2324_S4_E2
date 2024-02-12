import React from 'react';

const DeleteButton = (props) => {
  const id = props.data.id;

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/settings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Datos eliminados correctamente');
        // Puedes realizar otras acciones después de eliminar, si es necesario
      } else {
        alert('Error al eliminar los datos');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud');
    }
  };

  return (
    <span className="total-value-renderer">
      <button onClick={handleDeleteClick}>
        Delete
      </button>
    </span>
  );
};

export default DeleteButton;
