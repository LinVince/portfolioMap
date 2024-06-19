import { Box, Typography } from "@mui/material";
import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <Box padding={5}>
        <Typography>Oops</Typography>
        <Typography>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error occurred."}
        </Typography>
      </Box>
    </>
  );
};

export default ErrorPage;
