import { Link } from "react-router-dom";
import { TopBar } from "../../components/TopBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Card, Ratio } from "react-bootstrap";
import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";

export const ViewLayout = () => {
  let location = useLocation();
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:8080/api${location.pathname}.json`
      );
      const datos = await response.json();
      setData(datos);
    };

    getData();
  }, [location]);

  return (
    <>
      <TopBar />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">
          Home
        </Link>
        <Typography color="text.primary">{data.name}</Typography>
      </Breadcrumbs>

      <Row>
        <Col sm={5}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={data.imageUrl} />
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Card.Body>{data.deathDate}</Card.Body>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={7}>
          <Ratio aspectRatio="16x9">
            <iframe
              title="{data.name}"
              src={data.wikiUrl}
              frameBorder="0"
            ></iframe>
          </Ratio>
        </Col>
      </Row>
    </>
  );
};
