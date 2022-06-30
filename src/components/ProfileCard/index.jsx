import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { red, grey } from "@mui/material/colors";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { patchUser } from "../../services/patchUser";

const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const onlyFirstLetter = (str) => {
  return str.charAt(0).toUpperCase();
};

const formatDateForInput = (str) => {
  const matchs = str.match(/^(\d+)-(\d+)-(\d+)$/);
  return `${matchs[3]}-${matchs[2]}-${matchs[1]}`;
};

export const ProfileCard = ({ me }) => {
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const postData = {
      imageUrl: e.target[1].value,
      email: e.target[3].value,
      birthday: formatDateForInput(e.target[2].value),
      password: e.target[4].value,
    };

    console.log(postData.birthday);

    const usuario = await patchUser(me.id, postData);
    console.log(usuario);
    window.location.reload();
  };

  return me ? (
    <>
      <Container>
        <Row>
          <Col>
            <Card sx={{ maxWidth: 345, backgroundColor: grey[50] }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
                    {onlyFirstLetter(me.username)}
                  </Avatar>
                }
                title={"Nickname: " + capitalizeFirst(me.username)}
                subheader={me.birthday}
              />
              <CardMedia
                component="img"
                height="194"
                image={
                  me.imageUrl
                    ? me.imageUrl
                    : "https://c.tenor.com/yheo1GGu3FwAAAAC/rick-roll-rick-ashley.gif"
                }
                alt="Imagen perfil"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Correo: {me.email ? me.email : "<Sin correo>"}
                </Typography>
              </CardContent>
            </Card>
          </Col>
          <Col>
            <Form onSubmit={handleUpdateProfile}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" disabled defaultValue={me.username} />
                <Form.Text className="text-muted">
                  El username no puede ser modificado
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicImageUrl">
                <Form.Label>Imagen de perfil (URL)</Form.Label>
                <Form.Control type="text" defaultValue={me.imageUrl} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBirthday">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={
                    me.birthday ? formatDateForInput(me.birthday) : " "
                  }
                  placeholder="Fecha de nacimiento"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  defaultValue={me.email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" defaultValue={me.password} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <>
      <div
        className="mt-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </div>
    </>
  );
};
