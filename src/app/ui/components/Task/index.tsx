import React from "react";

import { ITaskProps } from "../../../models/types";
import "./style.css";

type TaskData = ITaskProps & {
  handleDeleteTask: () => void;
  handleCompleteTask: () => void;
  handleEditTask: () => void;
};

export const Task: React.FC<TaskData> = ({
  category,
  isCompleted = false,
  title,
  handleDeleteTask,
  handleCompleteTask,
  handleEditTask,
}) => {
  return (
    <div className="list-task">
      <div className="list-content">
        <p
          className="title"
          style={{ textDecoration: isCompleted ? "line-through" : "" }}
        >
          {title}
        </p>
        <p>( {category} )</p>
      </div>
      <div className="list-buttons">
        <button onClick={handleCompleteTask}>
          {isCompleted ? "Recomeçar" : "Completar"}
        </button>
        <button onClick={handleEditTask}>Editar</button>
        <button className="remove" onClick={handleDeleteTask}>
          X
        </button>
      </div>
    </div>
  );
};
