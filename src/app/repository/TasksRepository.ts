import TasksDAODatabase from "../dao/TasksDAODatabase";
import { IAuth, ITaskProps } from "../models/types";

const TASKS_DAO = new TasksDAODatabase();

async function createTask(tasks: ITaskProps): Promise<Error | string> {
  try {
    await TASKS_DAO.save(tasks);
    return `Tarefa "salva" com sucesso`;
  } catch (error) {
    return new Error("Erro ao salvar esta tarefa!");
  }
}

async function getAllTasks(): Promise<ITaskProps[]> {
  return await TASKS_DAO.getAll();
}

async function deleteTask(taskId: string): Promise<void> {
  try {
    await TASKS_DAO.delete(taskId);
  } catch (error) {
    console.error(error);
  }
}

async function completeTask(task: ITaskProps): Promise<void> {
  await TASKS_DAO.complete(task)
    .then((response) => console.log(response))
    .catch((error) => console.log("Erro: " + error));
}

async function updateTask(task: ITaskProps): Promise<void> {
  await TASKS_DAO.update(task)
    .then((response) => console.log(response))
    .catch((error) => console.log("Erro: " + error));
}

async function login(email: string, password: string): Promise<IAuth | Error> {
  try {
    const ACCESS_TOKEN = await TASKS_DAO.auth({ email, password });
    if (ACCESS_TOKEN instanceof Error) {
      return new Error("Email ou senha incorreta");
    }
    return ACCESS_TOKEN;
  } catch (error) {
    const ERROR = (error as { message: string }).message;
    if (ERROR.includes("auth/email-already-in-use"))
      return new Error("Usuário já cadastrado");

    if (ERROR.includes("auth/weak-password"))
      return new Error("A senha deve ter pelo menos 6 caracteres");

    return new Error(ERROR || "Houve um erro interno");
  }
}

async function sigIn(email: string, password: string): Promise<IAuth | Error> {
  try {
    const ACCESS_TOKEN = await TASKS_DAO.signIn({ email, password });
    if (ACCESS_TOKEN instanceof Error) return new Error("Erro");
    return ACCESS_TOKEN;
  } catch (error) {
    const ERROR = (error as { message: string }).message;
    if (ERROR.includes("auth/invalid-login-credentials"))
      return new Error("Email ou senha incorreta");
    return new Error(ERROR || "Houve um erro interno");
  }
}

async function logout(): Promise<Error | void> {
  await TASKS_DAO.logout().catch(() => {
    return new Error("Houve um erro interno");
  });
}

export const TASK_REPOSITORY = {
  createTask,
  getAllTasks,
  deleteTask,
  completeTask,
  updateTask,
  login,
  logout,
  sigIn,
};
