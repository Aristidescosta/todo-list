import { ITaskProps } from "../models/types";

async function saveTask(
  tasks: ITaskProps[],
  task: ITaskProps
): Promise<Error | string> {
  try {
    localStorage.setItem("tasks-toDoList", JSON.stringify([...tasks, task]));
    return "Tarefa salva com sucesso";
  } catch (error) {
    return new Error("Erro ao salvar esta tarefa!");
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
    localStorage.setItem("tasks-toDoList", JSON.stringify(filterdeTask));
    return filterdeTask;
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
}

export const TASKS_DAO = {
  saveTask,
  getTaksById,
  deleteTask
};
