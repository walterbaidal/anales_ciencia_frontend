import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Fab, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Form } from "react-bootstrap";
import { patchUser } from "../../services/patchUser";
import { deleteUser } from "../../services/deleteUser";
import { getUserById } from "../../services/getUserById";
import { EditElementButton } from "../EditElementButton";

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

const userColumns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 180 },
  { field: "email", headerName: "Email", width: 350 },
  {
    field: "password",
    headerName: "Password",
    description: "This column is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: () => `**************`,
  },
  {
    field: "role",
    headerName: "Role",
    type: "number",
    width: 80,
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "birthDate", headerName: "Fecha creacion", width: 200 },
  { field: "deathDate", headerName: "Fecha fin", width: 200 },
  {
    field: "imageUrl",
    headerName: "URL Imagen",
    description: "This column is not sortable.",
    sortable: false,
    width: 200,
  },
  {
    field: "wikiUrl",
    headerName: "URL Wiki",
    width: 200,
  },
];

export const DataTable = ({
  rows,
  data_table_selected,
  products,
  entities,
  persons,
}) => {
  const [userLoaded, setUserLoaded] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    const edit_user = await getUserById(finalClickInfo.id);
    setUserLoaded(edit_user);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [finalClickInfo, setFinalClickInfo] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault();

    const putData = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      role: parseInt(e.target[3].value),
    };

    const usuario = await patchUser(userLoaded.id, putData);
    console.log(usuario);

    handleClose();
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    await deleteUser(userLoaded.id);
    handleClose();
  };

  let renderEditElementButton = (
    selected_tab,
    element_id,
    products,
    entities,
    persons
  ) => {
    return (
      <EditElementButton
        selected_tab={data_table_selected}
        element_id={element_id}
        products={products}
        entities={entities}
        persons={persons}
      />
    );
  };

  const renderEditUserButton = (
    <>
      <Fab
        onClick={handleOpen}
        variant="extended"
        color="secondary"
        aria-label="edit"
      >
        <EditIcon sx={{ mr: 1 }} />
        Editar
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit"
        aria-describedby="edit"
      >
        <Box sx={style}>
          <Form onSubmit={handleEdit}>
            <Form.Group className="me-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                defaultValue={userLoaded ? userLoaded.username : " "}
              />
            </Form.Group>

            <Form.Group className="me-3" controlId="password">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                defaultValue={userLoaded ? userLoaded.email : " "}
              />
            </Form.Group>

            <Form.Group className="me-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                defaultValue={userLoaded ? userLoaded.password : " "}
              />
            </Form.Group>

            <Form.Select
              defaultValue={userLoaded ? userLoaded.role.toString() : " "}
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              <option value="1">Read</option>
              <option value="2">Write</option>
              <option value="0">Inactive</option>
            </Form.Select>

            <Button variant="primary" type="submit">
              Actualizar Usuario
            </Button>
            <Button onClick={handleDelete} variant="danger">
              Borrar Usuario
            </Button>
          </Form>
        </Box>
      </Modal>
    </>
  );

  const handleOnCellClick = (params) => {
    setFinalClickInfo(params);
  };

  return data_table_selected === "Usuario" ? (
    <div className="mt-3" style={{ height: 400, width: "100%" }}>
      <DataGrid
        aria-label="users"
        rows={rows}
        columns={userColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellClick={handleOnCellClick}
      />
      {finalClickInfo ? renderEditUserButton : null}
      {!finalClickInfo && `Selecciona un usuario para editar/borrar`}
    </div>
  ) : (
    <div className="mt-3" style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellClick={handleOnCellClick}
      />
      {finalClickInfo
        ? renderEditElementButton(
            data_table_selected,
            finalClickInfo.id,
            products,
            entities,
            persons
          )
        : null}
      {!finalClickInfo &&
        `Selecciona un/una ${data_table_selected} para editar/borrar`}
    </div>
  );
};
