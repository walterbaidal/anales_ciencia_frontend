import { Link, Navigate } from "react-router-dom";
import { TopBar } from "../../components/TopBar";
import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import Cookies from "js-cookie";
import { ProfileCard } from "../../components/ProfileCard";

export const MeLayout = ({ me }) => {
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
      <ProfileCard me={me} />
    </>
  ) : (
    <Navigate to="/" />
  );
};
