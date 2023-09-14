import TasksDAODatabase from "../dao/TasksDAODatabase";
import { ITaskProps } from "../models/types";

const TASKS_DAO = new TasksDAODatabase();

async function createTask(
  tasks: ITaskProps[],
  task: ITaskProps,
  save?: boolean
): Promise<Error | string> {
  try {
    TASKS_DAO.save(tasks, task);
    return `Tarefa ${save ? "salva" : "atualizada"} com sucesso`;
  } catch (error) {
    return new Error("Erro ao salvar esta tarefa!");
  }
}

async function getAllTasks(): Promise<ITaskProps[] | Error> {
  try {
    const TASKS = await TASKS_DAO.getAll();
    if (TASKS) return JSON.parse(TASKS);
    return [];
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
}

async function getTaksById(
  tasks: ITaskProps[],
  id: number
): Promise<ITaskProps[] | Error> {
  try {
    const TASK = tasks.filter((task) => task.id === id);
    if (TASK) {
      return TASK;
    }
    return new Error("Erro ao listar os dados desta tarefa");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
}

async function deleteTask(
  tasks: ITaskProps[],
  task: ITaskProps[]
): Promise<ITaskProps[] | Error> {
  try {
    const newTasks = [...tasks];
    const filterdeTask = newTasks.filter((taskFiltered) =>
      taskFiltered.id !== task[0].id ? taskFiltered : null
    );
    TASKS_DAO.delete(filterdeTask);
    return filterdeTask;
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
}

async function completeTask(
  taskId: number,
  tasks: ITaskProps[]
): Promise<ITaskProps[] | Error> {
  try {
    const newTask = [...tasks];
    newTask.map((task) =>
      task.id === taskId ? (task.isCompleted = !task.isCompleted) : task
    );
    TASKS_DAO.delete(newTask);
    return newTask;
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
}

export const TASK_REPOSITORY = {
  createTask,
  getAllTasks,
  getTaksById,
  deleteTask,
  completeTask,
};
