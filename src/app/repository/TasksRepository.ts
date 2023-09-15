import TasksDAODatabase from "../dao/TasksDAODatabase";
import { ITaskProps } from "../models/types";

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

export const TASK_REPOSITORY = {
  createTask,
  getAllTasks,
  deleteTask,
  completeTask,
  updateTask
};
