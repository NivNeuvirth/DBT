import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundImage: "linear-gradient(180deg, #FDE791, #FFF)",
        backgroundSize: "100% 150px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CssBaseline />
      <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ textTransform: "uppercase" }}
        style={{ backgroundColor: "#0e3c34", margin: "8px 0" }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
