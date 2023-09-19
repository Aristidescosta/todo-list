import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { SignIn } from "../ui/pages";

interface IRequireAuth {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<IRequireAuth> = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) return <SignIn />;

  return children;
};
