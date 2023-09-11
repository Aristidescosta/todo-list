import { createContext, useContext, useState, useCallback } from "react";

interface IModalContextData {
  isModalOpen: boolean;
  toogleModalOpen: () => void;
}

interface IModalContextProps {
  children: React.ReactNode;
}

export const useModalContext = () => {
  useContext(ModalContext);
};

const ModalContext = createContext({} as IModalContextData);

export const ModalProvider: React.FC<IModalContextProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toogleModalOpen = useCallback(() => {
    setIsModalOpen((oldModalOpen) => !oldModalOpen);
  }, []);

  return (
    <ModalContext.Provider value={{ isModalOpen, toogleModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
