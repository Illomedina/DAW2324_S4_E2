import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteButton = (props) => {
  const id = props.data.id;

  const handleDeleteClick = async () => {
    // Mostrar una ventana de confirmación con el mensaje personalizado
    const userConfirmed = window.confirm(`¿Estás seguro de que deseas borrar "${props.data.id}"?`);
    if (!userConfirmed) {
      return; // No borrar si el usuario no confirmó
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
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
