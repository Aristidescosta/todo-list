import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  CardActions,
  Grid,
} from "@mui/material";
import { Delete, Update, MoreVert } from "@mui/icons-material";
import { ITask } from "../../../models/types";

type CardContainerProps = ITask & {
  onDelete: () => void;
  handleUpdateTask: (title: string) => void;
};

export const CardContainer: React.FC<CardContainerProps> = ({
  category,
  completed,
  date,
  imageUrl,
  title,
  description,
  handleUpdateTask,
  onDelete,
}) => {
  return (
    <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={title}
          subheader={date}
        />
        <CardMedia component="img" height="194" image={imageUrl} alt={title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Delete task" onClick={onDelete}>
            <Delete />
          </IconButton>
          <IconButton aria-label="atualiza a tarefa" onClick={() => handleUpdateTask(title)}>
            <Update />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
