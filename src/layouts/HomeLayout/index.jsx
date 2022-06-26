import { TopBar } from "../../components/TopBar";
import { AuthBar } from "../../components/AuthBar";
import { ListGroup, Row, Col } from "react-bootstrap";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "./index.styles.css";

export const HomeLayout = ({ setUser, user, products, persons, entities }) => {
  const navigate = useNavigate();
  const redirect = useCallback(
    (ruta, id) => navigate(`/${ruta}/${id}`, { replace: true }),
    [navigate]
  );

  const listProducts = products?.map((product) => (
    <ListGroup.Item
      key="product{product.id}"
      action
      onClick={() => redirect("products", product.id)}
    >
      {product.name} - {product.id}
    </ListGroup.Item>
  ));

  const listPersons = persons?.map((person) => (
    <ListGroup.Item
      key="person{person.id}"
      action
      onClick={() => redirect("people", person.id)}
    >
      {person.name}
    </ListGroup.Item>
  ));
  const listEntities = entities?.map((entity) => (
    <ListGroup.Item
      key="entity{entity.id}"
      action
      onClick={() => redirect("entities", entity.id)}
    >
      {entity.name}
    </ListGroup.Item>
  ));

  return listProducts && listPersons && listEntities ? (
    <>
      <TopBar />
      <AuthBar setUser={setUser} user={user} />

      <Row className="mt-3">
        <Col>
          <ListGroup>{listProducts}</ListGroup>
        </Col>
        <Col>
          <ListGroup>{listPersons}</ListGroup>
        </Col>
        <Col>
          <ListGroup>{listEntities}</ListGroup>
        </Col>
      </Row>
    </>
  ) : (
    <>
      <TopBar />
      <AuthBar setUser={setUser} user={user} />
      <div
        className="mt-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </div>
    </>
  );
};
