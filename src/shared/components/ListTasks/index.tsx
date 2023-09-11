import { Task } from "..";
import "./style.css";

export interface TaskProps {
  title: string;
  category: string;
  id: number;
  isCompleted: boolean;
}

interface ListHeaderProps {
  tasks: TaskProps[];
}

export const ListTasks: React.FC<ListHeaderProps> = ({ tasks }) => {
  return (
    <div className="list-container">
      <h1>Lista de Tarefas</h1>
      <div className="list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            category={task.category}
            id={task.id}
            isCompleted={task.isCompleted}
            title={task.title}
          />
        ))}
      </div>
    </div>
  );
};
