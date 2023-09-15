import { ITaskProps } from "../models/types";

export default interface TasksDAO {
  save(tasks: ITaskProps): Promise<void>;

  getAll(): Promise<ITaskProps[]>;

  delete(taskID: string): Promise<void>;

  complete(tasks: ITaskProps): Promise<void>
}
