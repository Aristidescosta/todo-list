import React from "react";

import { TaskProps } from "../../types";
import "./style.css";

type TaskData = TaskProps & {
  handleDeleteTask: () => void;
  handleCompleteTask: () => void;
};

export const Task: React.FC<TaskData> = ({
  category,
  id,
  isCompleted = false,
  title,
  handleDeleteTask,
  handleCompleteTask,
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
        <button className="remove" onClick={handleDeleteTask}>
          X
        </button>
      </div>
    </div>
  );
};
