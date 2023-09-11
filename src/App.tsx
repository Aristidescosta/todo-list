import { useState } from "react";
import { Header } from "./shared/components/Header";
import { ListTasks } from "./shared/components/ListTasks";
import { ButtonAdd, TaskModal } from "./shared/components";
import { ModalProvider } from "./shared/contexts/ModalContext";

export const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Criar a lista de tarefas",
      category: "Trabalho",
      isCompleted: true,
    },
    {
      id: 2,
      title: "Estudar React js + TypeScript",
      category: "Estudo",
      isCompleted: false,
    },
  ]);

  return (
    <ModalProvider>
      <Header />
      <ListTasks tasks={tasks} />
      <ButtonAdd />
      <TaskModal />
    </ModalProvider>
  );
};
