import { useCallback, useEffect, useState } from "react";
import { v4 as createId } from "uuid";

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
import { TaskModalEdit } from "../../components/TaskModalEdit";

export const HomeScreen = () => {
  const [tasks, setTasks] = useState<ITaskProps[]>([]);
  const [task, setTask] = useState<ITaskProps>();
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    setIsLoading(true);
    async function loadTasks() {
      const TASKS = await TASK_REPOSITORY.getAllTasks();
      setTasks(TASKS);
      setIsLoading(false);
    }
    loadTasks();
  }, []);

  const handleOpenModalEdit = useCallback(
    (id: string) => {
      setOpenModalEdit(true);
      const TASK = tasks.filter((taskFiltered) => taskFiltered.docId === id);

      if (TASK) {
        setTask(TASK[0]);
      }
    },
    [tasks]
  );

  function handleCloseModalEdit() {
    setOpenModalEdit(false);
  }

  const handleUpdateTask = useCallback(
    (title: string, category: string) => {
      setIsLoading(true);
      async function updateTask() {
        if (task)
          await TASK_REPOSITORY.updateTask({ ...task, title, category }).then(
            async () => {
              const TASKS = await TASK_REPOSITORY.getAllTasks();
              setTasks(TASKS);
            }
          );

        setIsLoading(false);
      }
      updateTask();
    },
    [task]
  );

  const handleCompleteTask = useCallback(
    (id: string) => {
      setIsLoading(true);
      async function completeTask() {
        const TASK_FILTERED = tasks.filter(
          (taskFiltered) => taskFiltered.docId === id
        );
        await TASK_REPOSITORY.completeTask(TASK_FILTERED[0]);
        const TASKS = await TASK_REPOSITORY.getAllTasks();
        setTasks(TASKS);
        setIsLoading(false);
      }
      completeTask();
    },
    [tasks]
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      const TASK = tasks.filter((task) => task.docId === id);
      async function deleteTask() {
        await TASK_REPOSITORY.deleteTask(id);
        const TASKS = await TASK_REPOSITORY.getAllTasks();
        setTasks(TASKS);
        setIsLoading(false);
      }
      if (confirm(`Deseja realmente apagar a tarefa '${TASK[0].title}'?`)) {
        setIsLoading(true);

        deleteTask();
      }
    },
    [tasks]
  );

  const addTask = useCallback((title: string, category: string) => {
    const newTask = {
      id: createId(),
      title: title,
      category: category,
      isCompleted: false,
    };
    TASK_REPOSITORY.createTask(newTask).then(async () => {
      TASK_REPOSITORY.getAllTasks()
        .then((respnse) => setTasks(respnse))
        .catch((error) => alert(error));
    });
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Preloader />
      ) : tasks.length > 0 ? (
        <ListTasks
          tasks={tasks}
          handleCompleteTask={handleCompleteTask}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleOpenModalEdit}
        />
      ) : (
        <Oops />
      )}
      <ButtonAdd handleOpenModal={handleOpenModal} />
      {openModal && (
        <TaskModal handleAddTask={addTask} handleOpenModal={handleOpenModal} />
      )}
      {openModalEdit && task && (
        <TaskModalEdit
          task={task}
          handleCloseModal={handleCloseModalEdit}
          handleUpdateTask={handleUpdateTask}
        />
      )}
    </>
  );
};
