import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import TaskDAODatabase from "../dao/TaskDAODatabase";
import { IAuth, ITask } from "../models/types";
import { storage } from "../../firebase/firebaseConfig";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const TASK_DAO = new TaskDAODatabase();

async function createTask(task: ITask, file: File): Promise<Error | string> {
  try {
    const NEW_FILE = ref(storage, `tasks/image-${getRandomInt(0, 10000)}.png`);
    await uploadBytes(NEW_FILE, file);
    await getDownloadURL(NEW_FILE)
      .then(async (response) => {
        await TASK_DAO.save({ ...task, imageUrl: response });
      })
      .catch((err) => console.log(err));
    return `Tarefa "salva" com sucesso`;
    return "";
  } catch (error) {
    const ERROR = (error as { message: string }).message;
    return new Error(ERROR || "Houve um erro interno");
  }
}

async function getAll(): Promise<ITask[] | Error> {
  try {
    return await TASK_DAO.findAll();
  } catch (error) {
    const ERROR = (error as { message: string }).message;
    return new Error(ERROR || "Houve um erro interno");
  }
}

async function sigIn(email: string, password: string): Promise<IAuth | Error> {
  try {
    const ACCESS_TOKEN = await TASK_DAO.sigIn(email, password);
    if (ACCESS_TOKEN instanceof Error)
      return new Error("Erro: " + ACCESS_TOKEN);
    return ACCESS_TOKEN;
  } catch (error) {
    const ERROR = (error as { message: string }).message;
    if (ERROR.includes("auth/invalid-email"))
      return new Error("Email inválido");

    if (ERROR.includes("auth/invalid-login-credentials"))
      return new Error("Email ou senha incorreta");
    return new Error(ERROR || "Houve um erro interno");
  }
}

async function sigUp(email: string, password: string): Promise<IAuth | Error> {
  try {
    const ACCESS_TOKEN = await TASK_DAO.sigIn(email, password);
    if (ACCESS_TOKEN instanceof Error)
      return new Error("Erro: " + ACCESS_TOKEN);
    return ACCESS_TOKEN;
  } catch (error) {
    const ERROR = (error as { message: string }).message;
    if (ERROR.includes("auth/invalid-login-credentials"))
      return new Error("Email ou senha incorreta");
    return new Error(ERROR || "Houve um erro interno");
  }
}

export const TASK_REPOSITORY = {
  createTask,
  getAll,
  sigIn,
  sigUp,
};
