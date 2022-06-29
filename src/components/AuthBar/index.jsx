import Cookies from "js-cookie";
import { Form, Button, Row, Col, Nav } from "react-bootstrap";
import { getUserByUsername } from "../../services/getUserByUsername";
import "./index.styles.css";

export const AuthBar = ({
  setUser,
  user,
  isLoggedIn,
  setIsLoggedIn,
  role,
  setRole,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = await getUserByUsername(e.target[0].value);

    if (usuario.role === 0 || usuario.password !== e.target[1].value) {
      alert("Contraseña incorrecta o usuario no activo");
      return;
    } else {
      Cookies.set("isLoggedIn", true);
      Cookies.set("user", usuario.username);
      Cookies.set("role", usuario.role);
      setIsLoggedIn(true);
      setUser(usuario.username);
      setRole(usuario.role);
    }
  };

  const renderAdminButton = (
    <Nav.Item>
      <Button variant="success" href="/admin">
        Admin
      </Button>
    </Nav.Item>
  );

  return !isLoggedIn ? (
    <Col id="authbar">
      <Row>
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Group className="me-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" name="username" />
          </Form.Group>

          <Form.Group className="me-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Row>
    </Col>
  ) : (
    <>
      <Nav className="justify-content-end">
        <Nav.Item>
          <Button variant="info" href="/admin">
            {user}
          </Button>
        </Nav.Item>{" "}
        {isLoggedIn && Cookies.get("role") === "2" ? renderAdminButton : null}
        <Nav.Item>
          <Button
            onClick={() => {
              setIsLoggedIn(false);
              setUser();
              Cookies.remove("isLoggedIn");
              Cookies.remove("role");
              Cookies.remove("user");
            }}
            variant="danger"
          >
            Logout
          </Button>
        </Nav.Item>
      </Nav>
    </>
  );
};
