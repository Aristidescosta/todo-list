export interface ITaskProps {
  title: string;
  category: string;
  id: string;
  isCompleted: boolean;
  docId?: string
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

export declare interface DocumentData{}

export type TDeleteTask = Omit<TTaskCreate, "tasks">;

