import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HomeLayout } from "./layouts/HomeLayout/index.jsx";
import { ViewLayout } from "./layouts/ViewLayout/index.jsx";
import { AdminLayout } from "./layouts/AdminLayout/index.jsx";
import { Container } from "react-bootstrap";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import "./App.css";
import Cookies from "js-cookie";
import { MeLayout } from "./layouts/MeLayout/index.jsx";

function App() {
  const [user, setUser] = useState({});
  const [persons, setPersons] = useState();
  const [products, setProducts] = useState();
  const [entities, setEntities] = useState();
  const [users, setUsers] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [role, setRole] = useState();
  const [me, setMe] = useState();

  useEffect(() => {
    Cookies.get("isLoggedIn")
      ? setIsLoggedIn(Cookies.get("isLoggedIn"))
      : setIsLoggedIn(false);

    Cookies.get("role") ? setRole(Cookies.get("role")) : setRole();

    Cookies.get("user") ? setUser(Cookies.get("user")) : setUser();

    const getPersons = async () => {
      const response = await fetch(`http://localhost:8080/api/people.json`);
      const personas = await response.json();
      setPersons(personas);
    };
    const getProducts = async () => {
      const response = await fetch(`http://localhost:8080/api/products.json`);
      const productos = await response.json();
      setProducts(productos);
    };
    const getEntities = async () => {
      const response = await fetch(`http://localhost:8080/api/entities.json`);
      const entidades = await response.json();
      setEntities(entidades);
    };
    const getUsers = async () => {
      const response = await fetch(`http://localhost:8080/api/users.json`);
      const usuarios = await response.json();
      setUsers(usuarios);
    };

    const getMe = async () => {
      const response = await fetch(
        `http://localhost:8080/api/users.json?username=${Cookies.get("user")}`
      );
      const profile = await response.json();
      setMe(profile[0]);
    };

    getProducts();
    getPersons();
    getEntities();
    getUsers();
    getMe();
  }, []);

  const navigate = useNavigate();
  const redirect = useCallback(
    (ruta, id) => navigate(`/${ruta}/${id}`, { replace: true }),
    [navigate]
  );

  const listGroupProducts = products?.map((product) => (
    <ListGroup.Item
      key={product.id}
      action
      onClick={() => redirect("products", product.id)}
    >
      {product.name}
    </ListGroup.Item>
  ));

  const listGroupPersons = persons?.map((person) => (
    <ListGroup.Item
      key={person.id}
      action
      onClick={() => redirect("people", person.id)}
    >
      {person.name}
    </ListGroup.Item>
  ));
  const listGroupEntities = entities?.map((entity) => (
    <ListGroup.Item
      key={entity.id}
      action
      onClick={() => redirect("entities", entity.id)}
    >
      {entity.name}
    </ListGroup.Item>
  ));

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout
              products={products}
              persons={persons}
              entities={entities}
              listGroupProducts={listGroupProducts}
              listGroupPersons={listGroupPersons}
              listGroupEntities={listGroupEntities}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              role={role}
              setRole={setRole}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route path="products/:id" element={<ViewLayout />} />
        <Route path="people/:id" element={<ViewLayout />} />
        <Route path="entities/:id" element={<ViewLayout />} />
        <Route
          path="admin"
          element={
            <AdminLayout
              user={user}
              role={role}
              setRole={setRole}
              users={users}
              products={products}
              persons={persons}
              entities={entities}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="me" element={<MeLayout me={me} />} />
      </Routes>
    </Container>
  );
}

export default App;
