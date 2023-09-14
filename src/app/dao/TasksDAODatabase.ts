import { ITaskProps } from "../models/types";
import TasksDAO from "./TasksDAO";

export default class TasksDAODatabase implements TasksDAO {
  async save(tasks: ITaskProps[], task: ITaskProps): Promise<void> {
    localStorage.setItem("tasks-toDoList", JSON.stringify([...tasks, task]));
  }

  async getAll(): Promise<string | null> {
    return localStorage.getItem("tasks-toDoList");
  }

  async delete(tasks: ITaskProps[]): Promise<void> {
    localStorage.setItem("tasks-toDoList", JSON.stringify(tasks));
  }
}
