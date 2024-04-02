import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  
  //Este metodo se encarga de hacer el login recibiendo usuario y contraseña
  const handleLogin = async (user, password) => {
    setAlert(false);

    try {
      //hacemos peticion con axios pasando parametros
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`,
        {
          user,
          password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        //si respuesta es igual a 200 guardamos usuario y token
        const { token } = response.data;
        const { user } = response.data;
        //verificamos que no esten vacios
        if (!token) {
          console.error("No token found in the response");
          setAlert(true);
          return;
        } else if (!user) {
          console.error("No user found in the response");
          setAlert(true);
        }
        //si no estan vacios se guardan los datos
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        //navegamos a /dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      //en caso de error mostramos alerta
      setAlert(true);
    }
  };

//Este metodo se encarga de comprovar que hayan datos cuando se envie la peticion
  const onSubmit = () => {
    const newErrors = {};
    if (!user) {
      newErrors.user = "user is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    //en caso de haber errores se mostraran 
    setErrors(newErrors);

    if (!newErrors.user && !newErrors.password) {
      //si no hay errores realizamos login
      handleLogin(user, password);
    }
  };

  return (
   
    <main className="antialiased background-login">
      <div className="container px-6 mx-auto">
        <section className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly items-center">
          <div className="flex pl-20 flex-col w-full">
            <h1 className="text-5xl font-bold primary-color" tabIndex="0">BackOffice Area</h1>
            <p className="w-5/12 mx-auto md:mx-0 primary-color" tabIndex="0">
              Control and monitorize your website data from dashboard.
            </p>
          </div>
          <div className="w-full pr-20 md:w-full lg:w-9/12 mx-auto md:mx-0">
            {alert && (
              <div className="flex flex-row bg-gray-900 h-10 w-[400px] rounded-[30px] mb-10" role="alert">
                <span className="flex flex-col justify-center text-white font-bold grow-[1] max-w-[90%] text-center">
                  Your request has been denied
                </span>
                <div className="w-[10%] bg-red-400 rounded-r-2xl shadow-[0_0_20px_#ff444477]"></div>
              </div>
            )}
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-primaryColor text-left mb-5" tabIndex="0">Sign in</h2>
              <form className="w-full">
                <div className="flex flex-col w-full my-5">
                  <label htmlFor="user" className="text-primaryColor mb-2">
                    User
                  </label>
                  <input
                    type="text"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Please insert your user"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:shadow-lg"
                    aria-invalid={errors.user ? "true" : "false"}
                  />
                  {errors.user && (
                    <div className="error" role="alert">{errors.user}</div>
                  )}
                </div>
                <div className="flex flex-col w-full my-5">
                  <label htmlFor="password" className="text-primaryColor mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please insert your password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:shadow-lg"
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {errors.password && (
                    <div className="error" role="alert">{errors.password}</div>
                  )}
                </div>
                <div className="flex flex-col w-full my-5">
                  <button
                    type="button"
                    id="button"
                    onClick={onSubmit}
                    className="w-full py-4 rounded-lg text-black-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-hover"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
