import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Link, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f1f1f1",
        padding: "10px 0",
        marginTop: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener"
            sx={{ margin: 1 }}
          >
            <FacebookIcon />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener"
            sx={{ margin: 1 }}
          >
            <InstagramIcon />
          </Link>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ marginTop: 2 }}
        >
          © {new Date().getFullYear()} DBT
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
