import React from "react";
import { Box, Modal, Typography, Button, Backdrop } from "@mui/material";

interface IModalDeleteProps {
  open: boolean;
  handleClose: () => void;
}

export const ModalDelete: React.FC<IModalDeleteProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-delete"
      aria-describedby="transition-modal-delete-description"
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
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" component="h2">
          Deseja realmente apagar este registro?
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          mt={2}
        >
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="outlined" color="primary" autoFocus>
            Apagar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
