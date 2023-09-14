import { useEffect, useState } from "react";

import { ITaskProps } from "../../../models/types";
import { Oops } from "../../components/Oops";
import {
  ButtonAdd,
  Header,
  ListTasks,
  Preloader,
  TaskModal,
} from "../../components";
import { TASK_REPOSITORY } from "../../../repository/TasksRepository";

export const HomeScreen = () => {
  const [tasks, setTasks] = useState<ITaskProps[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    setIsLoading(true);
    async function loadTasks() {
      await new Promise((resolve) => {
        setTimeout(async () => {
          const LOADED_TASKS = await TASK_REPOSITORY.getAllTasks();
          if (LOADED_TASKS instanceof Error) {
            alert(LOADED_TASKS.message);
            return;
          }
          setTasks(LOADED_TASKS);
          resolve("");
        }, 1000);
      });
      setIsLoading(false);
    }
    loadTasks();
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Preloader />
      ) : tasks.length > 0 ? (
        <ListTasks tasks={tasks} setTasks={setTasks} />
      ) : (
        <Oops />
      )}
      <ButtonAdd handleOpenModal={handleOpenModal} />
      {openModal && (
        <TaskModal
          tasks={tasks}
          setTasks={setTasks}
          handleOpenModal={handleOpenModal}
        />
      )}
    </>
  );
};
