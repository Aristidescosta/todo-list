import { IAuth, ITaskProps, IUser, } from "../models/types";

export default interface TasksDAO {
  save(tasks: ITaskProps): Promise<void>;

  getAll(): Promise<ITaskProps[]>;

  delete(taskID: string): Promise<void>;

  complete(tasks: ITaskProps): Promise<void>
  
  update(tasks: ITaskProps): Promise<void>

  auth(user: IUser): Promise<IAuth>

  signIn(): Promise<void | IAuth>

  logout(): Promise<void>
}
