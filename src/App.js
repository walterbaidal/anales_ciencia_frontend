import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HomeLayout } from "./layouts/HomeLayout/index.jsx";
import { ViewLayout } from "./layouts/ViewLayout/index.jsx";
import { Container } from "react-bootstrap";
import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [persons, setPersons] = useState();
  const [products, setProducts] = useState();
  const [entities, setEntities] = useState();

  useEffect(() => {
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

    getProducts();
    getPersons();
    getEntities();
  }, []);

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout
              setUser={setUser}
              user={user}
              products={products}
              persons={persons}
              entities={entities}
            />
          }
        />
        <Route path="products/:id" element={<ViewLayout />} />
        <Route path="people/:id" element={<ViewLayout />} />
        <Route path="entities/:id" element={<ViewLayout />} />
      </Routes>
    </Container>
  );
}

export default App;
