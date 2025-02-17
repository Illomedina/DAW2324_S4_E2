import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";

const resources = {
  eng: {
    translation: translationEN,
  },
  cat: {
    translation: translationCA,
  },
  esp: {
    translation: translationES,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "eng",
  fallbackLng: "eng",
  interpolation: {
    escapeValue: false,
  },
});

export const Login = () => {
  const { t } = useTranslation();
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
        //{
          //headers: {
            //Accept: "application/json",
            //"Content-Type": "application/json",
          //},
        //}
      );

      if (response.status === 200) {
        //si respuesta es igual a 200 guardamos usuario y token
        const { token } = response.data;
        //const { user } = response.data;
        //verificamos que no esten vacios
        if (!token) {
          console.error("No token found in the response");
          setAlert(true);
          return;
        } 
        //else if (!user) {
          //console.error("No user found in the response");
          //setAlert(true);
       // }
        //si no estan vacios se guardan los datos
        localStorage.setItem("token", token);

        // Hacemos una solicitud adicional para obtener los datos del usuario, incluido su rol
        const userDataResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pasamos el token en los headers de autorización
          },
        });

        if (userDataResponse.status === 200) {
          const userData = userDataResponse.data.data;
        const loggedInUser = userData.find(userData => userData.user === user);
        const idRole = loggedInUser ? loggedInUser.idRole : null;
        const userId = loggedInUser ? loggedInUser.id : null;
          console.log("User role:", idRole);
          // Guardamos los datos del usuario en el almacenamiento local
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("idRole", JSON.stringify(idRole));
          console.log("User ID:", userId);
          localStorage.setItem("userId", userId);
          // Navegamos a la página de dashboard
          navigate('/dashboard');
        }

        //localStorage.setItem("user", JSON.stringify(user));
        //setToken(token);
        //navegamos a /dashboard
        //navigate('/dashboard');
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
    
    <div className="antialiased background-login">
      <div className="float-right">
      <LanguageSwitcher />
      </div>
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="flex pl-20 flex-col w-full">
            <div>
              <svg
                className="w-20 h-20 mx-auto md:float-left fill-stroke primary-color"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>

            <h1 className="text-5xl font-bold primary-color">
              {t("BackOffice Area")}
            </h1>
            <p className="w-5/12 mx-auto md:mx-0 primary-color">
              {t("Control and monitorize your website data from dashboard.")}
            </p>
          </div>
          <div className="w-full pr-20 md:w-full lg:w-9/12 mx-auto md:mx-0">
            {/* TODO: */}
            {alert && (
              <div className="flex flex-row bg-gray-900 h-10 w-[400px] rounded-[30px] mb-10">
                <span className="flex flex-col justify-center text-white font-bold grow-[1] max-w-[90%] text-center">
                  {t("Your request has been denied")}
                </span>
                <div className="w-[10%] bg-red-400 rounded-r-2xl shadow-[0_0_20px_#ff444477]"></div>
              </div>
            )}
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-primaryColor text-left mb-5">
                {t("Sign in")}
              </h2>
              <form action="" className="w-full">
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="user" className="text-primaryColor mb-2">
                    {t("User")}
                  </label>
                  <input
                    type="text"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Please insert your user"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:shadow-lg"
                  />
                  {errors.user && (
                    <div className="error">{errors.user}</div>
                  )}
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="password" className="text-primaryColor mb-2">
                    {t("Password")}
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please insert your password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:shadow-lg"
                  />
                  {errors.password && (
                    <div className="error">{errors.password}</div>
                  )}
                </div>
                <div className="flex flex-col w-full my-5">
                  <button
                    id="button"
                    type="button"
                    onClick={() => onSubmit()}
                    className="w-full py-4 rounded-lg text-black-100"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="mr-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          ></path>
                        </svg>
                      </div>
                      <div className="font-bold">{t("Sign in")}</div>
                    </div>
                  </button>
                  <div className="flex justify-evenly mt-5">
                    <a
                      className="w-full text-center font-medium text-gray-500"
                    ></a>
                    <a
                      className="w-full text-center font-medium text-gray-500"
                    ></a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
