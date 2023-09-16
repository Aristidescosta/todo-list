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
  imageUrl,
  handleDeleteTask,
  handleCompleteTask,
  handleEditTask,
}) => {
  return (
    <div className="list-task">
      <div className="list-content">
        <img
          src={imageUrl}
          width={60}
          height={60}
          alt=""
        />
        <div>
          <p
            className="title"
            style={{ textDecoration: isCompleted ? "line-through" : "" }}
          >
            {title}
          </p>
          <p>( {category} )</p>
        </div>
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
