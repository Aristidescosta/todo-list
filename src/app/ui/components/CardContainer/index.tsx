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
  Grid
} from "@mui/material";
import { Delete, Update, MoreVert } from "@mui/icons-material";
import { ITask } from "../../../models/types";

export const CardContainer: React.FC<ITask> = ({
  category,
  completed,
  date,
  imageUrl,
  title,
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
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Delete task">
            <Delete />
          </IconButton>
          <IconButton aria-label="atualiza a tarefa">
            <Update />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
