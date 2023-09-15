import React, { useState } from "react";

import { categories } from "../../../utils";
import { ITaskProps } from "../../../models/types";

interface TaskModal {
  handleCloseModal: () => void;
  handleUpdateTask: (title: string, category: string) => void;
  task: ITaskProps;
}

export const TaskModalEdit: React.FC<TaskModal> = ({
  handleCloseModal,
  task,
  handleUpdateTask,
}) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value, category)
    if (!value || !category) return;
    handleUpdateTask(value, category);
    setCategory("");
    setValue("");
    handleCloseModal();
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>Editar tarefa</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o título da tarefa"
            onChange={(e) => setValue(e.target.value)}
            defaultValue={task.title}
          />
          <div className="select">
            <select
              defaultValue={task.category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={category}>Selecione uma categoria</option>
              {categories.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button type="button" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit">Atualiar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
