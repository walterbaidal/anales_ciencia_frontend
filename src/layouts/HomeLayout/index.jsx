import { TopBar } from "../../components/TopBar";
import { AuthBar } from "../../components/AuthBar";
import { ListGroup, Row, Col } from "react-bootstrap";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./index.styles.css";

export const HomeLayout = ({ setUser, user, products, persons, entities }) => {
  const navigate = useNavigate();
  const goProduct = useCallback(
    (id) => navigate(`/product/${id}`, { replace: true }),
    [navigate]
  );

  const listProducts = products?.map((product) => (
    <ListGroup.Item action onClick={goProduct(product.id)}>
      {product.name}
    </ListGroup.Item>
  ));
  const listPersons = persons?.map((person) => (
    <ListGroup.Item>{person.name}</ListGroup.Item>
  ));
  const listEntities = entities?.map((entity) => (
    <ListGroup.Item>{entity.name}</ListGroup.Item>
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
