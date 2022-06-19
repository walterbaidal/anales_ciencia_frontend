import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Card, Ratio } from "react-bootstrap";

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
      <Link to="/">Home</Link>
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
            <iframe src={data.wikiUrl} frameborder="0"></iframe>
          </Ratio>
        </Col>
      </Row>
    </>
  );
};
