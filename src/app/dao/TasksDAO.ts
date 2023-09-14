import { ITaskProps } from "../models/types";

export default interface TasksDAO {
  save(tasks: ITaskProps[], task: ITaskProps): Promise<void>;

  getAll(): Promise<string | null>;

  delete(tasks: ITaskProps[]): Promise<void>;
}
