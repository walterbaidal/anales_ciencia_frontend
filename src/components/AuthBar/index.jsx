import { Form, Button, Row, Col } from "react-bootstrap";
import "./index.styles.css";

export const AuthBar = ({ setUser, user }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:8080/api/users/${e.target[0].value}.json`
    );
    const { username, password, role } = await response.json();

    console.log(password, e.target[1].value);

    if (password !== e.target[1].value) {
      alert("Password no válido");
      return;
    }

    setUser({ username, password, role });
  };

  return !user ? (
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
    <div>
      <button onClick={setUser({})}>a</button>
    </div>
  );
};
