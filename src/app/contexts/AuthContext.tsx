import { useToast } from "@chakra-ui/react";
import { createContext, useState, useContext, useEffect } from "react";

import { TASK_REPOSITORY } from "../repository/TasksRepository";
import { IAuth} from "../models/types";

interface IAuthContextProps {
  children: React.ReactNode;
}

interface IAuthContextData {
  user: IAuth | null;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

const APP_STORAGE_NAME = "APP_ACCESS_TOKEN"

export const AuthProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<IAuth | null>(null);
  const TOAST = useToast();

  useEffect(()=>{
    const validateToken = async () =>{
      const STORAGE_DATA = localStorage.getItem(APP_STORAGE_NAME);
      if(STORAGE_DATA)
      setUser(JSON.parse(STORAGE_DATA))
    }
    validateToken()
  }, [])

  async function signin(email: string, password: string) {
    const DATA = await TASK_REPOSITORY.sigIn(email, password);
    if (DATA instanceof Error) {
      TOAST({
        title: DATA.message,
        status: "error",
        duration: 2000,
        position: "top-right",
        isClosable: true,
      });
      return false;
    }
    console.log(DATA)
    setToken(DATA)
    setUser(DATA);
    return true;
  }

  async function signout() {
    await TASK_REPOSITORY.logout();
    removeToken()
    setUser(null);
  }

  function setToken(user: IAuth) {
    localStorage.setItem(APP_STORAGE_NAME, JSON.stringify(user))
  }

  function removeToken() {
    localStorage.removeItem(APP_STORAGE_NAME);
  }

  return (
    <AuthContext.Provider
      value={{
        signin: signin,
        signout: signout,
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
