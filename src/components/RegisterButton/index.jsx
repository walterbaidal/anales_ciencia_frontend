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

export const RegisterButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const postData = {
      username: e.target[0].value,
      password: e.target[1].value,
      role: 1,
    };

    const response = await postUser(postData);

    if (response.violations !== undefined)
      alert(
        response.violations.map(
          (e) =>
            `Usuario ${postData.username} ya registrado. \n Error: ${e.message} `
        )
      );

    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} variant="success">
        Register
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-register"
        aria-describedby="modal-modal-register-user"
      >
        <Box sx={style}>
          <Form onSubmit={handleRegister}>
            <Form.Group className="me-3" controlId="username_register">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username_register"
              />
            </Form.Group>

            <Form.Group className="me-3" controlId="password_register">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password_registe"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
        </Box>
      </Modal>
    </>
  );
};
