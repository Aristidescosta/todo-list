import React from "react";
import "./style.css";
import { useModalContext } from "../../contexts/ModalContext";

interface TaskModalProps {
  handleCloseModal: () => void;
}

export const TaskModal: React.FC = () => {
  const categories = [
    {
      id: 1,
      title: "Trabalho",
    },
    {
      id: 2,
      title: "Pessoal",
    },
    {
      id: 3,
      title: "Estudos",
    },
  ];

  /* const { toogleModalOpen } = useModalContext();
  console.log(toogleModalOpen) */

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>Criar Tarefa</h1>
        <form>
          <input type="text" placeholder="Digite o título da tarefa" />
          <select>
            <option value="">Selecione uma categoria</option>
            {categories.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
          <div className="buttons">
            <button type="button">
              Cancelar
            </button>
            <button type="submit">Criar tarefa</button>
          </div>
        </form>
      </div>
    </div>
  );
};
