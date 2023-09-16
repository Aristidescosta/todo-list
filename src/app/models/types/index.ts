export interface ITaskProps {
  title: string;
  category: string;
  id: string;
  isCompleted: boolean;
  docId?: string;
  imageUrl: string
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

export interface IUser {
  email: string;
  password: string;
}

export interface IAuth {
  accessToken: string;
}

export interface IAuthError{
  errorCode: string;
  errorMessage: string
}

export type Photo = {
  name: string;
  url: string;
}

export declare interface DocumentData {}

export type TDeleteTask = Omit<TTaskCreate, "tasks">;
