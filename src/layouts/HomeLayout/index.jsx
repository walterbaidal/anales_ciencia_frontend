import { TopBar } from "../../components/TopBar";
import { AuthBar } from "../../components/AuthBar";
import { ListGroup, Row, Col } from "react-bootstrap";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./index.styles.css";

export const HomeLayout = ({ setUser, user, products, persons, entities }) => {
  const navigate = useNavigate();
  const redirect = useCallback(
    (ruta, id) => navigate(`/${ruta}/${id}`, { replace: true }),
    [navigate]
  );

  const listProducts = products?.map((product) => (
    <ListGroup.Item action onClick={() => redirect("products", product.id)}>
      {product.name}
    </ListGroup.Item>
  ));

  const listPersons = persons?.map((person) => (
    <ListGroup.Item action onClick={() => redirect("people", person.id)}>
      {person.name}
    </ListGroup.Item>
  ));
  const listEntities = entities?.map((entity) => (
    <ListGroup.Item action onClick={() => redirect("entities", entity.id)}>
      {entity.name}
    </ListGroup.Item>
  ));

  return (
    <>
      <TopBar />
      <AuthBar setUser={setUser} user={user} />

      <Row>
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
  );
};
