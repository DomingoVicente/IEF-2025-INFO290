import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, Providers } from "../../services/firebase";
import ErrorAlert from "../Alerts/ErrorAlert";
import logouach from "../../assets/Header/logo_uach.svg";
import logoinfor from "../../assets/Header/logo-infor.png";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError("Verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, Providers.google);
      navigate("/home");
    } catch (err) {
      setError("Error al iniciar sesión con Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[350px] bg-white shadow-lg rounded-3xl p-8 flex flex-col items-center space-y-6">
      {/* Logos */}
      <div className="flex justify-center gap-6 mb-4">
        <img src={logouach} className="w-16" alt="Logo UACH" />
        <img src={logoinfor} className="w-16" alt="Logo Infor" />
      </div>

      {/* Formulario */}
      <form className="w-full flex flex-col space-y-4" onSubmit={handleLogin}>
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Usuario
          </label>
          <input
            className="shadow-sm border rounded-lg w-full py-2 px-4 text-gray-700 focus:ring focus:ring-blue-300"
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="shadow-sm border rounded-lg w-full py-2 px-4 text-gray-700 focus:ring focus:ring-blue-300"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between text-sm text-blue-600 mt-1">
          <a href="/auth/register" className="hover:underline">
            ¿Olvidó su contraseña?
          </a>
        </div>

        <button
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Ingresar"}
        </button>
      </form>

      {/* Acceder con Google */}
      <button
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        onClick={signInWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? "Cargando..." : "Acceder con Google"}
      </button>

      {/* No tienes cuenta */}
      <div className="text-sm mt-2">
        <span>No tienes cuenta? </span>
        <a href="/auth/register" className="font-bold text-blue-600 hover:underline">
          Regístrate
        </a>
      </div>

      {/* Error Alert */}
      {error && <ErrorAlert message={error} type="error" onClose={() => setError("")} />}
    </div>
  );
};

export default LoginForm;
