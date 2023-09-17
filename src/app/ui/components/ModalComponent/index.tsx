/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState, useEffect } from "react";
import { AddAPhotoOutlined } from "@mui/icons-material";
import * as yup from "yup";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  LinearProgress,
  Modal,
  Paper,
  Typography,
} from "@mui/material";

import { IVFormErrors, VForm, VTextFields, useVForm } from "../../../forms";
import { ITask } from "../../../models/types";
import { style } from "./style";
import { TASK_REPOSITORY } from "../../../repository/TaskRepository";

interface IModalComponentProps {
  open: boolean;
  handleClose: () => void;
  isCreateTask: boolean;
  task?: ITask;
  isLoading: boolean;
  setIsLoading: (oldLoading: boolean) => void;
  save: (tasks: ITask, file: File) => void;
}

const formValidationSchema: yup.Schema<ITask> = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  docId: yup.string(),
  completed: yup.boolean().required(),
  imageUrl: yup.string().required(),
  date: yup.string().required(),
  description: yup.string().required().min(10).max(120),
});

export const ModalComponent: React.FC<IModalComponentProps> = ({
  open,
  isCreateTask = true,
  task,
  isLoading,
  handleClose,
  setIsLoading,
  save,
}) => {
  const [image, setImage] = useState("");
  const [picture, setPicture] = useState<File>();

  const { formRef } = useVForm();

  useEffect(() => {
    console.log(isCreateTask);
    if (!isCreateTask) {
      setIsLoading(false);
      formRef.current?.setData({
        title: task?.title,
        category: task?.category,
        docId: task?.docId,
        completed: task?.completed,
        imageUrl: task?.imageUrl,
        date: task?.date,
        description: task?.description,
      });
    } else {
      formRef.current?.setData({
        title: "",
        category: "",
        docId: "",
        completed: false,
        imageUrl: "",
        date: "",
        description: "",
      });
    }
  }, [
    formRef,
    isCreateTask,
    setIsLoading,
    task?.category,
    task?.completed,
    task?.date,
    task?.description,
    task?.docId,
    task?.imageUrl,
    task?.title,
  ]);

  const handleSave = (data: ITask) => {
    setIsLoading(true);
    const NEW_DATE = new Date();
    const DATE = `${String(NEW_DATE.getDate()).padStart(2, "0")}/${String(
      NEW_DATE.getMonth()
    ).padStart(2, "0")}/${NEW_DATE.getFullYear()}`;
    formValidationSchema
      .validate(
        { ...data, completed: false, imageUrl: image, date: DATE },
        { abortEarly: false }
      )
      .then((validatedData) => {
        const TASK = {
          title: validatedData.title,
          category: validatedData.category,
          docId: validatedData.docId,
          completed: validatedData.completed,
          imageUrl: validatedData.imageUrl,
          date: validatedData.date,
          description: validatedData.description,
        };
        if (picture)
          TASK_REPOSITORY.createTask(TASK, picture)
            .then((response) => alert(response))
            .catch((error) => alert(error));
        setIsLoading(false);
        handleClose();
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        const validationError: IVFormErrors = {};
        console.log(errors);

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationError[error.path] = error.message;
        });
        console.log(validationError);
        formRef.current?.setErrors(validationError);
      });
  };

  const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setPicture(event.currentTarget.files[0]);
      const url = URL.createObjectURL(event.currentTarget.files[0]);
      setImage(url);
    }
  };

  const handleClickInput = useCallback((element: HTMLElement | null) => {
    if (element) element.click();
  }, []);

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <VForm ref={formRef} onSubmit={handleSave}>
              <Box
                margin={1}
                display="flex"
                flexDirection="column"
                component={Paper}
                variant="outlined"
              >
                <Grid container direction="column" padding={2} spacing={2}>
                  <Grid item>
                    <Typography variant="h5">
                      {isCreateTask ? "NOVA TAREFA" : task?.title}
                    </Typography>
                  </Grid>

                  <Grid container item direction="row">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <VTextFields
                        fullWidth
                        name="title"
                        disabled={isLoading}
                        label="Nome da tarefa"
                        defaultValue={isCreateTask ? task?.title : ""}
                        /* onChange={(e) => setPeopleName(e.target.value)} */
                      />
                    </Grid>
                  </Grid>

                  <Grid container item direction="row">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <VTextFields
                        fullWidth
                        name="category"
                        disabled={isLoading}
                        label="Categoria"
                        defaultValue={isCreateTask ? task?.category : ""}
                      />
                    </Grid>
                  </Grid>

                  <Grid container item direction="row">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <VTextFields
                        fullWidth
                        name="description"
                        disabled={isLoading}
                        label="Descrição"
                        defaultValue={isCreateTask ? task?.description : ""}
                      />
                    </Grid>
                  </Grid>

                  <Grid container item direction="row">
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      onClick={() =>
                        handleClickInput(document.querySelector(".input"))
                      }
                      sx={{ cursor: "pointer" }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="input"
                        onChange={handleSetImage}
                        hidden
                      />

                      {image ? (
                        <img
                          src={task?.imageUrl ? task.imageUrl : image}
                          alt={"imageName"}
                          width={40}
                          height={40}
                        />
                      ) : (
                        <IconButton>
                          <AddAPhotoOutlined />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>

                  <Grid container item direction="row">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Button
                        disabled={isLoading ? isLoading : isLoading}
                        variant="outlined"
                        fullWidth
                        type="submit"
                      >
                        Criar
                      </Button>
                    </Grid>
                  </Grid>
                  {isLoading && (
                    <Grid item>
                      <LinearProgress variant="indeterminate" />
                    </Grid>
                  )}
                </Grid>
              </Box>
            </VForm>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
