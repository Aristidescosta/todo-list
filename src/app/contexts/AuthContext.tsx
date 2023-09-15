import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";
import { TASK_REPOSITORY } from "../repository/TasksRepository";

interface IAuthContextProps {
  children: React.ReactNode;
}

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => void;
  logUp: (email: string, password: string) => Promise<string | undefined>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = "APP_ACCESS_TOKEN";

export const AuthProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const ACCESS_TOKEN = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    if (ACCESS_TOKEN) setAccessToken(JSON.parse(ACCESS_TOKEN));
    else setAccessToken(undefined);
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await TASK_REPOSITORY.sigIn(email, password);
    if (result instanceof Error) {
      alert(result.message);
      return result.message;
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_ACCESS_TOKEN,
        JSON.stringify(result.accessToken)
      );
      setAccessToken(result.accessToken);
    }
  }, []);

  const handleLogUp = useCallback(async (email: string, password: string) => {
    const result = await TASK_REPOSITORY.login(email, password);
    if (result instanceof Error) {
      alert(result.message);
      return result.message;
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_ACCESS_TOKEN,
        JSON.stringify(result.accessToken)
      );
      setAccessToken(result.accessToken);
    }
  }, []);

  const IS_AUTHENTICATED = useMemo(() => !accessToken, [accessToken]);

  const handleLogout = useCallback(async () => {
    const RESULT = await TASK_REPOSITORY.logout();
    setAccessToken(undefined);
    localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    if (RESULT instanceof Error) return RESULT.message;
    return;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: IS_AUTHENTICATED,
        login: handleLogin,
        logout: handleLogout,
        logUp: handleLogUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
