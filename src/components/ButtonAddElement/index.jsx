import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { postElement } from "../../services/postElement";
import MultipleSelect from "../MultipleSelect";
import SingleSelect from "../SingleSelect";

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

export const ButtonAddElement = ({
  selected_tab,
  products,
  entities,
  persons,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [endpoint, setEndpoint] = useState();
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [selectedPersons, setSelectedPersons] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (selected_tab === "Producto") {
      setEndpoint("/api/products");
    } else if (selected_tab === "Entidad") {
      setEndpoint("/api/entities");
    } else if (selected_tab === "Persona") {
      setEndpoint("/api/people");
    }
  }, [selected_tab]);

  let printMultipleSelect = (
    selected_tab,
    elements,
    select_title,
    setSelectedValues
  ) => {
    return (
      <MultipleSelect
        selected_tab={selected_tab}
        elements={elements}
        select_title={select_title}
        setSelectedValues={setSelectedValues}
      />
    );
  };

  let printSingleSelect = (
    selected_tab,
    elements,
    select_title,
    setSelectedValues
  ) => {
    return (
      <SingleSelect
        selected_tab={selected_tab}
        elements={elements}
        select_title={select_title}
        setSelectedValues={setSelectedValues}
      />
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postData = {};

    const parcialPostData = {
      name: e.target[0].value,
      birthDate: e.target[1].value,
      deathDate: e.target[2].value,
      imageUrl: e.target[3].value,
      wikiUrl: e.target[4].value,
    };

    if (selected_tab === "Producto") {
      postData = {
        ...parcialPostData,
        entities: selectedEntities.map((id) => `/api/entities/${id}`),
        persons: selectedPersons.map((id) => `/api/people/${id}`),
      };
    } else if (selected_tab === "Entidad") {
      postData = {
        ...parcialPostData,
        products: selectedProducts.map((id) => `/api/products/${id}`),
        persons: selectedPersons.map((id) => `/api/people/${id}`),
      };
    } else if (selected_tab === "Persona") {
      postData = {
        ...parcialPostData,
        products: selectedProducts.map((id) => `/api/products/${id}`),
        entity: `/api/entities/${e.target[6].value}`,
      };
    }

    console.log(postData);

    await postElement(endpoint, postData);

    handleClose();
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
        Añadir {selected_tab}
      </Fab>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="me-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" name="name" />
            </Form.Group>

            <Form.Group className="me-3" controlId="password">
              <Form.Label>Fecha creacion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fecha creacion"
                name="email"
              />
            </Form.Group>

            <Form.Group className="me-3" controlId="password">
              <Form.Label>Fecha creacion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fecha creacion"
                name="email"
              />
            </Form.Group>

            <Form.Group className="me-3" controlId="url_imagen">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL Imagen"
                name="url_imagen"
              />
            </Form.Group>

            <Form.Group className="me-3" controlId="url_wiki">
              <Form.Label>URL Wiki</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL Wiki"
                name="url_wiki"
              />
            </Form.Group>

            {selected_tab === "Producto"
              ? printMultipleSelect(
                  selected_tab,
                  entities,
                  "Entidades",
                  [],
                  setSelectedEntities,
                  false
                )
              : null}

            {selected_tab === "Producto" || selected_tab === "Entidad"
              ? printMultipleSelect(
                  selected_tab,
                  persons,
                  "Personas",
                  [],
                  setSelectedPersons,
                  false
                )
              : null}

            {selected_tab === "Entidad" || selected_tab === "Persona"
              ? printMultipleSelect(
                  selected_tab,
                  products,
                  "Productos",
                  [],
                  setSelectedProducts,
                  false
                )
              : null}

            {selected_tab === "Persona"
              ? printSingleSelect(
                  selected_tab,
                  entities,
                  "Entidades",
                  [],
                  setSelectedEntities,
                  false
                )
              : null}

            <Button variant="primary" type="submit">
              Crear {selected_tab}
            </Button>
          </Form>
        </Box>
      </Modal>
    </>
  );
};
