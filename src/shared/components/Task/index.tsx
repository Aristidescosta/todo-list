import React from "react";

import { TaskProps } from "../ListTasks";
import "./style.css"

export const Task: React.FC<TaskProps> = ({
  category,
  id,
  isCompleted = false,
  title,
}) => {
  return (
    <div className="list-task">
      <div className="list-content">
        <p>{title}</p>
        <p>{category}</p>
      </div>
      <div className="list-buttons">
        <button>Completar</button>
        <button className="remove">X</button>
      </div>
    </div>
  );
};
