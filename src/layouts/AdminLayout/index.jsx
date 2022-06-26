import { Link } from "react-router-dom";
import { TopBar } from "../../components/TopBar";
import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";

export const AdminLayout = (products, persons, entities) => {
  return (
    <>
      <TopBar />
      <Breadcrumbs aria-label="breadcrumb" className="mt-2 mb-2">
        <Link underline="hover" color="inherit" to="/">
          Home
        </Link>
        <Typography color="text.primary">Admin</Typography>
      </Breadcrumbs>
    </>
  );
};
