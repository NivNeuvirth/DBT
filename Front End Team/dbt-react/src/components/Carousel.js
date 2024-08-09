import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import image1 from "../images/3.jpg";
import image2 from "../images/4.jpg";
import image3 from "../images/5.jpg";
import image4 from "../images/6.jpg";
import { alpha } from "@mui/material/styles";

const images = [image1, image2, image3, image4];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3500); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box
      position="relative"
      width="100%"
      height="95vh" // Increased height to show more of the picture
      objectFit="cover"
      maxHeight="700px" // Adjusted maximum height
      overflow="hidden"
      sx={(theme) => ({
        mt: { xs: 8, sm: 10 },
        mx: "auto", // center the box horizontally
        maxWidth: "95%", // to ensure it's not too wide
        alignSelf: "center",
        backgroundSize: "cover",
        borderRadius: "10px",
        outline: "1px solid",
        outlineColor: alpha("#BFCCD9", 0.5),
        boxShadow: `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`,
      })}
    >
      <Box
        component="img"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        width="100%"
        height="100%"
        sx={{ transition: "transform 0.5s ease-in-out", objectFit: "cover" }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color="white"
        bgcolor="rgba(0, 0, 0, 0.5)"
        p={2}
        borderRadius="5px"
        textAlign="center"
        sx={{ transform: "translate(-50%, -50%)" }} // Add this line
      >
        <Typography variant="h4" component="div">
          Explore the Wonders of the World
        </Typography>
      </Box>
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default Carousel;
