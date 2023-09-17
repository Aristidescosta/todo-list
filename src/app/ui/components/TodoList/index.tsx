import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme, Grid } from "@mui/material";
import { CardContainer, ModalComponent } from "..";
import { ITask } from "../../../models/types";

export const TodoList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();

  const save = (task: ITask) => {
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
    setTasks([...tasks, task]);
  };

  useEffect(() => {
    const TASKS_FINDED = localStorage.getItem("tasks");
    if (TASKS_FINDED) {
      setTasks(JSON.parse(TASKS_FINDED));
    }
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
      <Grid container item direction="row">
        {tasks.map((task) => (
          <CardContainer
            key={task.docId}
            category={task.category}
            completed={task.completed}
            date={task.date}
            imageUrl={task.imageUrl}
            title={task.title}
          />
        ))}
      </Grid>
      <ModalComponent
        handleClose={handleClose}
        open={open}
        isCreateTask
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        save={save}
      />
    </>
  );
};
