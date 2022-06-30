import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const ProfileCard = ({ me }) => {
  return me ? (
    <>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 200,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt={me.username}
        src={me.imageUrl}
      />
      {me.username} - {me.email} - {me.password} - {me.birthday} - -
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
