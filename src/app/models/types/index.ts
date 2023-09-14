export interface ITaskProps {
  title: string;
  category: string;
  id: number;
  isCompleted: boolean;
}

export type FilterProps = "all" | "completed" | "incomplete";

export type TTaskCreate = {
  task: ITaskProps;
  tasks: ITaskProps[];
};

export interface ITaskSave {
  newTask: ITaskProps;
  tasks: ITaskProps[];
}

export type TDeleteTask = Omit<TTaskCreate, "tasks">;
