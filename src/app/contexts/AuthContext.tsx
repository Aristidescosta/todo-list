import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";
import { TASK_REPOSITORY } from "../repository/TaskRepository";
import { IAuth } from "../models/types";

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface IAuthContextData {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<string | undefined>;
  logout: () => void;
  signUp: (email: string, password: string) => Promise<string | undefined>;
  user: Omit<IAuth, "accessToken"> | undefined;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = "APP_ACCESS_TOKEN";
const LOCAL_STORAGE_USER_LOGIN = "APP_USER_LOGIN";

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [user, setUser] = useState<Omit<IAuth, "accessToken">>();

  useEffect(() => {
    const ACCESS_TOKEN = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    if (ACCESS_TOKEN) setAccessToken(JSON.parse(ACCESS_TOKEN));
    else setAccessToken(undefined);
  }, []);

  const handleSigIn = useCallback(async (email: string, password: string) => {
    const result = await TASK_REPOSITORY.sigIn(email, password);
    if (result instanceof Error) {
      alert(result.message);
      return result.message;
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_ACCESS_TOKEN,
        JSON.stringify(result.accessToken)
      );
      localStorage.setItem(
        LOCAL_STORAGE_USER_LOGIN,
        JSON.stringify(result.user)
      );
      setAccessToken(result.accessToken);
      setUser({
        user: { name: result.user.name, photoUrl: result.user.photoUrl },
      });
    }
  }, []);

  const handleSigUp = useCallback(async (email: string, password: string) => {
    const result = await TASK_REPOSITORY.sigIn(email, password);
    if (result instanceof Error) {
      alert(result.message);
      return result.message;
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_ACCESS_TOKEN,
        JSON.stringify(result.accessToken)
      );
      localStorage.setItem(
        LOCAL_STORAGE_USER_LOGIN,
        JSON.stringify(result.user)
      );
      setAccessToken(result.accessToken);
      setUser({
        user: { name: result.user.name, photoUrl: result.user.photoUrl },
      });
    }
  }, []);

  const IS_AUTHENTICATED = useMemo(() => !accessToken, [accessToken]);

  const handleSigOut = useCallback(async () => {
    /* const RESULT = await TASK_REPOSITORY.logout(); */
    setAccessToken(undefined);
    localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    /* if (RESULT instanceof Error) return RESULT.message; */
    return;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: IS_AUTHENTICATED,
        signIn: handleSigIn,
        signUp: handleSigUp,
        logout: handleSigOut,
        user: user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
