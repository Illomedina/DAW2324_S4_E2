import React from 'react';

const DeleteButton = (props) => {
  const id = props.data.id;

  const handleDeleteClick = async () => {
    // Mostrar una ventana de confirmación con el mensaje personalizado
    const userConfirmed = window.confirm(`¿Estás seguro de que deseas borrar "${props.data.config}"?`);

    if (!userConfirmed) {
      return; // No borrar si el usuario no confirmó
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/settings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Datos eliminados correctamente');
        window.location.reload();
      } else {
        alert('Error al eliminar los datos');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud');
    }
  };

  return (
    <span >
      <button onClick={handleDeleteClick}>
        Delete
      </button>
    </span>
  );
};

export default DeleteButton;
