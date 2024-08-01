import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Hero from "../components/Hero";
import FAQ from "../components/FAQ";
import getLPTheme from "./getLPTheme";
import Map from "../components/Map";
import AttractionsLandingPage from "../components/AttractionsLandingPage";
import Carousel from "../components/Carousel";

export default function LandingPage() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        <Carousel />
        <Map />
        <AttractionsLandingPage />
        <FAQ />
        <Divider />
      </Box>
    </ThemeProvider>
  );
}
