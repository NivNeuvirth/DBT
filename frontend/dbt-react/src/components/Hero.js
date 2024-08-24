import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        backgroundImage: "linear-gradient(180deg, #FDE791, #FFF)",
        backgroundSize: "100% 150px",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 2, sm: 6 },
        }}
      >
        <Stack spacing={4} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
              color: "#f2bb2a",
              animation: "fadeIn 2s ease-out",
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translateY(20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            DBT&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: "#0e3c34",
              }}
            >
              YOUR INSIDER
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{
              alignSelf: "center",
              width: { sm: "100%", md: "80%" },
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
            }}
          >
            Discover the Best Attractions Around the Globe
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0e3c34",
              color: "#fff",
              fontSize: "1rem",
              mt: 3,
              transition: "transform 0.3s ease",
              "&:hover": {
                backgroundColor: "#0e3c34",
                transform: "translateY(-5px)",
              },
            }}
            onClick={() => (window.location.href = "/Discover")}
          >
            Discover Now
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
