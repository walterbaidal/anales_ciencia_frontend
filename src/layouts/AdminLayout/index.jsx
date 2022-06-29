import { Link, Navigate } from "react-router-dom";
import { TopBar } from "../../components/TopBar";
import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { AdminTabs } from "../../components/AdminTabs";
import Cookies from "js-cookie";

export const AdminLayout = ({
  user,
  role,
  setRole,
  users,
  products,
  persons,
  entities,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  return Cookies.get("role") && Cookies.get("role") === "2" ? (
    <>
      <TopBar />
      <Breadcrumbs aria-label="breadcrumb" className="mt-2 mb-2">
        <Link underline="hover" color="inherit" to="/">
          Home
        </Link>
        <Typography component={"span"} color="text.primary">
          Admin
        </Typography>
      </Breadcrumbs>
      <AdminTabs
        users={users}
        products={products}
        persons={persons}
        entities={entities}
      />
    </>
  ) : (
    <Navigate to="/" />
  );
};
