import React from 'react';
import { useNavigate } from 'react-router-dom';


const EditButton = (props) => {
  const id = props.data.id;
  const navigate= useNavigate();

  const handleSaveClick = async () => {
    // Aquí debes obtener los datos que deseas enviar a la API
    const dataToSend = {
      name: props.data.name,
      surname: props.data.surname,
      user: props.data.user,
      email:props.data.email,
    };
    // Mostrar una ventana de confirmación
    const userConfirmed = window.confirm('¿Estás seguro de que deseas guardar los cambios?');

    if (!userConfirmed) {
      return; // No guardar si el usuario no confirmó
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Datos guardados correctamente');
        navigate('/user');
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
    <span >
      <button onClick={handleSaveClick}>
        Save
      </button>
    </span>
  );
};

export default EditButton;
