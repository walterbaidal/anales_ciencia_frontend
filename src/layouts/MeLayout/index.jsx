import { Link, Navigate } from "react-router-dom";
import { TopBar } from "../../components/TopBar";
import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import Cookies from "js-cookie";

export const MeLayout = () => {
  return Cookies.get("user") ? (
    <>
      <TopBar />
      <Breadcrumbs aria-label="breadcrumb" className="mt-2 mb-2">
        <Link underline="hover" color="inherit" to="/">
          Home
        </Link>
        <Typography component={"span"} color="text.primary">
          Perfil
        </Typography>
      </Breadcrumbs>
    </>
  ) : (
    <Navigate to="/" />
  );
};
