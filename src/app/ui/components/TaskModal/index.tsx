import React, { useCallback, useState } from "react";

import { TaskProps } from "../../../models/types";
import { categories } from "../../../utils";
import "./style.css";

interface TaskModal {
  tasks: TaskProps[];
  setTasks: (oldTasks: TaskProps[]) => void;
  handleOpenModal: () => void;
}

export const TaskModal: React.FC<TaskModal> = ({
  tasks,
  setTasks,
  handleOpenModal,
}) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  const addTask = useCallback(
    (title: string, category: string) => {
      const newTask = {
        id: tasks.length,
        title: title,
        category: category,
        isCompleted: false,
      };
      localStorage.setItem(
        "tasks-toDoList",
        JSON.stringify([...tasks, newTask])
      );
      setTasks([...tasks, newTask]);
    },
    [tasks]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || !category) return;
    addTask(value, category);
    setCategory("");
    setValue("");
    handleOpenModal();
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>Criar nova Tarefa</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o título da tarefa"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <div className="select">
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value={category}>Selecione uma categoria</option>
              {categories.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button type="button" onClick={handleOpenModal}>
              Cancelar
            </button>
            <button type="submit">Criar tarefa</button>
          </div>
        </form>
      </div>
    </div>
  );
};
