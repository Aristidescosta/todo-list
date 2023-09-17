import {
  DocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import TaskDAO from "./TaskDAO";
import { DB } from "../../firebase/firebaseConfig";
import { IAuth, ITask } from "../models/types";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

class Task {
  title: string;
  description: string;
  category: string;
  completed: boolean;
  date: string;
  imageUrl: string;

  constructor(task: ITask) {
    this.title = task.title;
    this.description = task.description;
    this.category = task.category;
    this.completed = task.completed;
    this.imageUrl = task.imageUrl;
    this.date = task.date;
    /* this.task.title=task.title */
  }
  /* 
  toString(): string {
      return this.name + ', ' + this.state + ', ' + this.country;
  } */
}

const TASK_CONVERTER = {
  toFirestore: (task: Task) => {
    return {
      title: task.title,
      description: task.description,
      category: task.category,
      completed: task.completed,
      imageUrl: task.imageUrl,
      date: task.date,
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot) => {
    const data = snapshot.data() as ITask;
    return new Task(data);
  },
};

export default class TaskDAODatabase implements TaskDAO {
  async sigIn(email: string, password: string): Promise<IAuth> {
    const AUTH = getAuth();
    const USER = await signInWithEmailAndPassword(
      AUTH,
      email,
      password
    );
    console.log(USER.user)
    const IAUTH = {
      accessToken: USER.user.uid,
      user:{
        name: USER.user.displayName,
        photoUrl: USER.user.photoURL
      }
    };
    return IAUTH;
  }

  async sigUp(email: string, password: string): Promise<IAuth> {
    const AUTH = getAuth();
    const USER = await createUserWithEmailAndPassword(
      AUTH,
      email,
      password
    );
    console.log(USER.user)
    const IAUTH = {
      accessToken: USER.user.uid,
      user:{
        name: USER.user.displayName,
        photoUrl: USER.user.photoURL
      }
    };
    return IAUTH;
  }
  async save(task: Task): Promise<void> {
    const TASK_REF = doc(collection(DB, "tasks")).withConverter(TASK_CONVERTER);

    await setDoc(TASK_REF, task).then(() => {
      console.log("Document successfully written!");
    });
    //.catch((error) => {
    // console.error("Error writing document: ", error);
    // });
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(DB, "tasks", id));
  }

  async update(task: ITask): Promise<void> {
    if (task.docId) {
      const TASK_REF = doc(DB, "tasks", task.docId);
      await updateDoc(TASK_REF, {
        ...task,
        title: task.title,
        description: task.description,
        date: serverTimestamp(),
        category: task.category,
        imageUrl: task.imageUrl,
      }).then(() => {
        console.log("Document successfully written!");
      });
    }
  }

  async findAll(): Promise<Task[]> {
    const TASK_REF = query(collection(DB, "tasks")).withConverter(
      TASK_CONVERTER
    );
    const QUERY_SNAP = await getDocs(TASK_REF);
    const TASKS: Task[] = [];

    QUERY_SNAP.forEach((doc) => {
      const task = doc.data() as ITask;
      TASKS.push(new Task(task));
    });

    return TASKS;
  }
}
