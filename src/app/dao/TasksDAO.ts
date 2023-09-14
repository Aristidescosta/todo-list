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

export const TASKS_DAO = {
  saveTask,
};
