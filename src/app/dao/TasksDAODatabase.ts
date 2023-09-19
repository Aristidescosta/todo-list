import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  inMemoryPersistence,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import { IAuth, ITaskProps, IUser } from "../models/types";
import TasksDAO from "./TasksDAO";
import { DB } from "../../firebase/firebaseConfig";

const PROVIDER = new GoogleAuthProvider();

export default class TasksDAODatabase implements TasksDAO {
  async auth(user: IUser): Promise<IAuth> {
    const AUTH = getAuth();
    const USER = await createUserWithEmailAndPassword(
      AUTH,
      user.email,
      user.password
    );
    const IUSER = {
      accessToken: await USER.user.getIdToken(true),
      displayName: USER.user.displayName,
      email: USER.user.email,
      photoURL: USER.user.photoURL,
    };
    return IUSER;
  }
  async logout(): Promise<void> {
    const AUTH = getAuth();
    await signOut(AUTH);
  }

  async signIn(): Promise<void | IAuth> {
    const AUTH = getAuth();
    setPersistence(AUTH, inMemoryPersistence).then(async() => {
      const USER = await signInWithPopup(AUTH, PROVIDER);
      const IUSER = {
        accessToken: await USER.user.getIdToken(true),
        displayName: USER.user.displayName,
        email: USER.user.email,
        photoURL: USER.user.photoURL,
      };

      return IUSER
    });
  }

  async complete(tasks: ITaskProps): Promise<void> {
    await updateDoc(doc(DB, "tasks", tasks.docId as string), {
      ...tasks,
      isCompleted: !tasks.isCompleted,
    });
  }

  async update(tasks: ITaskProps): Promise<void> {
    await updateDoc(doc(DB, "tasks", tasks.docId as string), {
      ...tasks,
      category: tasks.category,
      title: tasks.title,
      imageUrl: tasks.imageUrl,
    });
  }

  async save(tasks: ITaskProps): Promise<void> {
    await addDoc(collection(DB, "tasks"), {
      title: tasks.title,
      isCompleted: false,
      category: tasks.category,
      id: tasks.id,
      imageUrl: tasks.imageUrl,
    });
  }

  async getAll(): Promise<ITaskProps[]> {
    const tasksCol = collection(DB, "tasks");
    const TASKS_SNAPSHOT = await getDocs(tasksCol);
    const DATA_ARRAY: ITaskProps[] = [];
    TASKS_SNAPSHOT.docs.map((doc) => {
      const VALUE = {
        docId: doc.id,
        ...doc.data(),
      } as ITaskProps;
      DATA_ARRAY.push(VALUE);
    });
    return DATA_ARRAY;
  }

  async delete(taskId: string): Promise<void> {
    await deleteDoc(doc(DB, "tasks", taskId));
  }
}
