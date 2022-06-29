import { TopBar } from "../../components/TopBar";
import { AuthBar } from "../../components/AuthBar";
import { ListGroup, Row, Col } from "react-bootstrap";
import React from "react";
import { CircularProgress } from "@mui/material";
import "./index.styles.css";

export const HomeLayout = ({
  setUser,
  user,
  listGroupProducts,
  listGroupPersons,
  listGroupEntities,
  isLoggedIn,
  setIsLoggedIn,
  role,
  setRole,
}) => {
  return listGroupProducts && listGroupPersons && listGroupEntities ? (
    <>
      <TopBar />
      <AuthBar
        user={user}
        setUser={setUser}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        role={role}
        setRole={setRole}
      />

      <Row className="mt-3">
        <Col>
          <ListGroup>{listGroupProducts}</ListGroup>
        </Col>
        <Col>
          <ListGroup>{listGroupPersons}</ListGroup>
        </Col>
        <Col>
          <ListGroup>{listGroupEntities}</ListGroup>
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
