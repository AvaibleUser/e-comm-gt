import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputControlled from "../components/input.component";

import { login, getPathToRedirect, logout } from "../services/login.service";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(logout, []);

  const madeLogin = async () => {
    if (!username || !password) {
      setErrorMsg("Debe de llenar ambos campos");
      setTimeout(() => setErrorMsg(""), 2500);
      return;
    }
    try {
      await login(username, password);
      navigate(getPathToRedirect());
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.response.data);
      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-neutral">
      <div className="card items-center w-96 bg-base-100">
        <figure className="flex justify-center px-2 pt-2">
          <kbd className="kbd text-2xl m-8">E Comm GT</kbd>
        </figure>
        {errorMsg ? (
          <div className="alert alert-error shadow-lg mx-8">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMsg}</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="card-body flex flex-col">
          <InputControlled
            label="Nombre de usuario"
            placeholder="rookie"
            value={username}
            setValue={setUsername}
          />
          <InputControlled
            label="Contraseña"
            placeholder="qa1234"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <button onClick={madeLogin} className="btn m-4">
            Iniciar Sesion
          </button>
        </div>
      </div>
    </main>
  );
}
