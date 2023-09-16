import React, { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";

import "./style.css";

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const { isAuthenticated, login, logUp } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (
    email: string,
    password: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await logUp(email, password);
  };

  const handleSigin = async (
    email: string,
    password: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    setIsLoading(true);
    e.preventDefault();
    await login(email, password);
    setIsLoading(false);
  };

  if (!isAuthenticated) return <>{children}</>;

  return (
    <div className="login-container">
      <div className="content">
        <form
          onSubmit={
            isSignIn
              ? (e) => handleLogin(userEmail, userPassword, e)
              : (e) => handleSigin(userEmail, userPassword, e)
          }
        >
          <h1>{!isSignIn ? "Entrar" : "Criar conta"}</h1>

          <div>
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
            />
          </div>

          <div>
            <label>Palavra passe</label>
            <input
              type="password"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
            />
          </div>

          {isLoading ? (
            <button
              type="button"
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            >
              Entrando...
            </button>
          ) : (
            <button type="submit">Entrar</button>
          )}

          <p>
            {!isSignIn ? "Ainda não tem uma conta?" : "Já tens uma conta?"}
            <a href="#" onClick={() => setIsSignIn(!isSignIn)}>
              Clique aqui
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
