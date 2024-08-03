import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Hero from "../components/Hero";
import FAQ from "../components/FAQ";
import Map from "../components/Map";
import AttractionsLandingPage from "../components/AttractionsLandingPage";
import Carousel from "../components/Carousel";

export default function LandingPage() {
  return (
    <Box>
      <CssBaseline />
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        <Carousel />
        <Map />
        <AttractionsLandingPage />
        <FAQ />
        <Divider />
      </Box>
    </Box>
  );
}
