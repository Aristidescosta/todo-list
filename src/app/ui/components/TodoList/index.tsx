import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography, useTheme, Grid } from "@mui/material";
import { CardContainer, ModalComponent } from "..";
import { ITask } from "../../../models/types";
import { ModalDelete } from "../ModalDelete";
import { TASK_REPOSITORY } from "../../../repository/TaskRepository";

export const TodoList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [task, setTask] = useState<ITask>();
  const [isCreateTask, setIsCreateTask] = useState(true);

  const handleOpen = () => {
    setIsCreateTask(true);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleUpdateTask = useCallback(
    (title: string) => {
      const TASK = tasks.filter((taskFiltered) => taskFiltered.title === title);
      console.log(title);
      if (TASK) setTask(TASK[0]);
      setOpen(true);
      setIsCreateTask(false);
    },
    [tasks]
  );

  const theme = useTheme();
  console.log(task);

  const save = (task: ITask, file: File) => {
    localStorage.setItem(
      "tasks",
      JSON.stringify([{ ...tasks, file: file }, task])
    );
    setTasks([...tasks, task]);
  };

  useEffect(() => {
    const getAll = async () => {
      await TASK_REPOSITORY.getAll()
        .then((response) => {
          if (response instanceof Error) {
            alert(response.message);
            return;
          }
          setTasks(response);
        })
        .catch((error) => alert(error));
    };

    getAll();
  }, []);

  return (
    <>
      <Box
        component="header"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height={200}
        bgcolor={theme.palette.background.paper}
      >
        <Typography variant="h3">Lista de tarefas</Typography>
        <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleOpen}>
          Criar lista
        </Button>
      </Box>
      <Grid container item direction="row" mt={2}>
        {tasks.map((task) => (
          <CardContainer
            key={tasks.length + 1}
            category={task.category}
            completed={task.completed}
            date={task.date}
            imageUrl={task.imageUrl}
            title={task.title}
            description={task.description}
            handleUpdateTask={handleUpdateTask}
            onDelete={handleDelete}
          />
        ))}
      </Grid>
      <ModalComponent
        handleClose={handleClose}
        open={open}
        isCreateTask={isCreateTask}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        save={save}
        task={task}
      />
      <ModalDelete handleClose={handleCloseEdit} open={openEdit} />
    </>
  );
};
