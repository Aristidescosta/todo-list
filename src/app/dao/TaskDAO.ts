import { IAuth, ITask } from "../models/types";

export default interface TaskDAO{
  save(task: ITask): Promise<void>
  findAll(): Promise<ITask[]>
  /* findById(id: string): Promise<ITask> */
  delete(id: string): Promise<void>
  update(task: ITask): Promise<void>
  sigIn(email: string, password: string): Promise<IAuth>
  sigUp(email: string, password: string): Promise<IAuth>
  /* findByUserId(userId: string): Promise<ITask[]>
  findByCategory(category: string): Promise<ITask[]>
  findByDocId(docId: string): Promise<ITask[]>
  findByCompleted(completed: boolean): Promise<ITask[]>
  findByDate(date: string): Promise<ITask[]>
  findByDescription(description: string): Promise<ITask[]>
  findByTitle(title: string): Promise<ITask[]>
  findByImageUrl(imageUrl: string): Promise<ITask[]>
  findByCategoryAndDocId(category: string, docId: string): Promise<ITask[]>
   */
}