import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { postUser } from "../../services/postUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ButtonAddUser = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      role: parseInt(e.target[3].value),
    };

    const usuario = await postUser(postData);
    console.log(usuario);

    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Fab
        onClick={handleOpen}
        variant="extended"
        color="primary"
        aria-label="add"
      >
        <AddIcon sx={{ mr: 1 }} />
        Añadir usuario
      </Fab>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="me-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
              />
            </Form.Group>

            <Form.Group className="me-3" controlId="password">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" name="email" />
            </Form.Group>

            <Form.Group className="me-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>

            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">Read</option>
              <option value="2">Write</option>
              <option value="0">Inactive</option>
            </Form.Select>

            <Button variant="primary" type="submit">
              Crear Usuario
            </Button>
          </Form>
        </Box>
      </Modal>
    </>
  );
};
