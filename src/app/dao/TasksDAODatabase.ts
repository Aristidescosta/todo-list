import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite";
import { ITaskProps } from "../models/types";
import TasksDAO from "./TasksDAO";
import { DB } from "../../firebase/firebaseConfig";

export default class TasksDAODatabase implements TasksDAO {
  async update(tasks: ITaskProps, id: number): Promise<void> {
    const TASK_REF = doc(DB, "tasks", `${id}`);
    await updateDoc(TASK_REF, { tasks });
  }

  async save(tasks: ITaskProps): Promise<void> {
    await addDoc(collection(DB, "task "), {
      title: tasks.title,
      isCompleted: false,
      category: tasks.category,
      id: tasks.id,
    });
  }

  async getAll(): Promise<ITaskProps[]> {
    const tasksCol = collection(DB, "tasks");
    const TASKS_SNAPSHOT = await getDocs(tasksCol);
    const DATA_ARRAY: ITaskProps[] = [];
    TASKS_SNAPSHOT.docs.map((doc) => {
      const VALUE = 
      {
        docId: doc.id,
        ... doc.data()

      } as ITaskProps;
      DATA_ARRAY.push(VALUE);
    });
    return DATA_ARRAY;
  }

  async delete(taskId: string): Promise<void> {
    await deleteDoc(doc(DB, "tasks", taskId));
  }
}
