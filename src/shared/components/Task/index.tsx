import React from "react";
import { TaskProps } from "../ListTasks";

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
      <div>
        <button>Completar</button>
        <button>X</button>
      </div>
    </div>
  );
};
