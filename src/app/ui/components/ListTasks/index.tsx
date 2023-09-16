import { useState } from "react";

import { ITaskProps } from "../../../models/types";
import { filters } from "../../../utils";
import { Search, Task } from "..";
import "./style.css";

interface ListHeaderProps {
  tasks: ITaskProps[];
  handleDeleteTask: (taskId: string) => void;
  handleCompleteTask: (taskId: string) => void;
  handleEditTask: (taskId: string) => void;
}

export const ListTasks: React.FC<ListHeaderProps> = ({
  tasks,
  handleDeleteTask,
  handleCompleteTask,
  handleEditTask,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="list-container">
      <h1>Lista de Tarefas</h1>
      <div className="list">
        <Search search={search} setSearch={setSearch} />
        <h1>Filtrar por</h1>
        <div className="filter-container">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {filters.map((filter) => (
              <option value={filter.value} key={filter.id}>
                {filter.title}
              </option>
            ))}
          </select>
        </div>
        {tasks
          .filter((task) =>
            filter === "all"
              ? true
              : filter === "completed"
              ? task.isCompleted
              : !task.isCompleted
          )
          .filter((task) => task.title.includes(search.toLocaleLowerCase()))
          .map((task) => (
            <Task
              key={task.id}
              category={task.category}
              id={task.id}
              isCompleted={task.isCompleted}
              title={task.title}
              imageUrl={task.imageUrl}
              handleDeleteTask={() => handleDeleteTask(task.docId as string)}
              handleCompleteTask={() =>
                handleCompleteTask(task.docId as string)
              }
              handleEditTask={() => handleEditTask(task.docId as string)}
              
            />
          ))}
      </div>
    </div>
  );
};
