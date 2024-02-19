import React, { useState } from 'react';
import AppLayout from '../../layout/AppLayout';


const RegisterFormContent = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    user: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Aquí puedes manejar el caso en que la solicitud sea exitosa
        console.log('Registro exitoso');
      } else {
        // Aquí puedes manejar el caso en que la solicitud falle
        console.error('Error al registrar');
      }
    } catch (error) {
      // Aquí puedes manejar cualquier error que ocurra durante la solicitud
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-10 overfl flex items-center justify-center overflow-y-scroll">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full ">
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-gray-200 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              />
            </svg>
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create a new user
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter the details to create.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="Katy"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="surname"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Surname *
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="Perry"
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="user"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              User *
            </label>
            <input
              type="text"
              id="user"
              name="user"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="kathy_perry"
              value={formData.user}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="hello@kathy.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="text-gray-600 text-xs mt-1">
              Must contain 1 uppercase letter, 1 number, min. 8 characters.
            </p>
          </div>
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
          <p className="text-gray-600 text-xs text-center mt-4">
            By clicking Register, you agree to accept Apex Financial's
            <a href="#" className="text-blue-500 hover:underline">
              Terms and Conditions
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

const RegisterFormC = () => {
    return (
      <AppLayout>
        <RegisterFormContent />
      </AppLayout>
    );
  };

export default RegisterFormC;
