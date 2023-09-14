import TasksDAODatabase from "../dao/TasksDAODatabase";
import { ITaskProps } from "../models/types";

const TASKS_DAO = new TasksDAODatabase();

async function createTask(tasks: ITaskProps): Promise<Error | string> {
  try {
    await TASKS_DAO.save(tasks)
      .then((response) => console.log(response, "salvo"))
      .catch((response) => console.log(response, "deu bom"));
    return `Tarefa "salva" com sucesso`;
  } catch (error) {
    return new Error("Erro ao salvar esta tarefa!");
  }
}

async function getAllTasks(): Promise<ITaskProps[] | Error> {
  try {
    console.log(await TASKS_DAO.getAll());
    return await TASKS_DAO.getAll();
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
}

async function getTaksById(id: number): Promise<ITaskProps | Error> {
  try {
    const TASKS = await getAllTasks();
    if (TASKS instanceof Error) return new Error("Houve um erro interno");
    const TASK = TASKS.filter((task) => task.id === id);
    if (TASK.length > 0) {
      console.log(TASK);
      return TASK[0];
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

async function deleteTask(taskId: string): Promise<void> {
  try {
    TASKS_DAO.delete(taskId);
  } catch (error) {
    console.error(error);
  }
}

async function completeTask(
  taskId: number,
  tasks: ITaskProps[]
): Promise<ITaskProps[] | Error> {
  try {
    const TASK = tasks.filter((task) =>
      task.id === taskId ? (task.isCompleted = !task.isCompleted) : task
    );
    await TASKS_DAO.update(TASK[0], taskId)
      .then((response) => console.log(response))
      .catch((error) => console.log("Erro: " + error));
    return [...tasks, TASK[0]];
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
