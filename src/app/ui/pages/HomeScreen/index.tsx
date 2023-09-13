import { useEffect, useState } from "react";

import oopsImg from "../../../../assets/oops.png";
import { TaskProps } from "../../../models/types";
import {
  ButtonAdd,
  Header,
  ListTasks,
  Preloader,
  TaskModal,
} from "../../components";

export const HomeScreen = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    setIsLoading(true);
    async function loadTasks() {
      await new Promise((resolve) => {
        setTimeout(() => {
          const loadedTasks = localStorage.getItem("tasks-toDoList");
          if (loadedTasks) setTasks(JSON.parse(loadedTasks));
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
        <div className="center">
          <h3>Sem novas tarefas</h3>
          <img
            src={oopsImg}
            style={{ width: 320, alignSelf: "center" }}
            alt=""
          />
          <p className="title">Sem tarefas adicionadas</p>
          <p>Toque no botão "+" para adicionar uma nova tarefa</p>
        </div>
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
