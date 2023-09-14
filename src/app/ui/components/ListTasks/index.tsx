import { useState } from "react";

import { ITaskProps } from "../../../models/types";
import { filters } from "../../../utils";
import { Search, Task } from "..";
import "./style.css";
import { TASK_REPOSITORY } from "../../../repository/TasksRepository";

interface ListHeaderProps {
  tasks: ITaskProps[];
  setTasks: (oldTasks: ITaskProps[]) => void;
}

export const ListTasks: React.FC<ListHeaderProps> = ({ tasks, setTasks }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleDeleteTask = (taskId: string) => {
    if (confirm(`Deseja realmente apagar esta tarefa?`))
      TASK_REPOSITORY.deleteTask(taskId).then((responseDelete) => {
        /* 
        setTasks(responseDelete); */
      });
  };

  const handleCompleteTask = (taskId: number) => {
    TASK_REPOSITORY.completeTask(taskId, tasks).then((response) => {
      if (response instanceof Array) setTasks(response);
      else alert(response.message);
    });
  };

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
              handleDeleteTask={() => handleDeleteTask(task.docId as string)}
              handleCompleteTask={() => handleCompleteTask(task.id)}
            />
          ))}
      </div>
    </div>
  );
};
