import { Search, Task } from "..";
import { ITaskProps } from "../../../models/types";
import { filters } from "../../../utils";
import "./style.css";
import { useState } from "react";

interface ListHeaderProps {
  tasks: ITaskProps[];
  setTasks: (oldTasks: ITaskProps[]) => void;
}

export const ListTasks: React.FC<ListHeaderProps> = ({ tasks, setTasks }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  console.log(filter);

  const handleDeleteTask = (taskId: number) => {
    const newTasks = [...tasks];
    const filterdeTask = newTasks.filter((task) =>
      task.id !== taskId ? task : null
    );
    localStorage.setItem("tasks-toDoList", JSON.stringify(filterdeTask));
    setTasks(filterdeTask);
  };

  const handleCompleteTask = (taskId: number) => {
    const newTask = [...tasks];
    newTask.map((task) =>
      task.id === taskId ? (task.isCompleted = !task.isCompleted) : task
    );
    localStorage.setItem("tasks-toDoList", JSON.stringify(newTask));
    setTasks(newTask);
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
              handleDeleteTask={() => handleDeleteTask(task.id)}
              handleCompleteTask={() => handleCompleteTask(task.id)}
            />
          ))}
      </div>
    </div>
  );
};
