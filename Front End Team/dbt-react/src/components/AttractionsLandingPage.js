import React, { useState, useEffect, useContext, useRef } from "react";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import fetchAttractions from "./FetchAttractions";
import CardLandingPage from "./CardLandingPage";
import { UserContext } from "../context/UserContext"; // Adjust the import path as necessary

const AttractionsLandingPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const getAttractions = async () => {
      const data = await fetchAttractions();
      setAttractions(data);
      setLoading(false);
      setTimeout(checkArrows, 100); // Check arrows after loading
    };
    getAttractions();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      checkArrows();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [attractions]);

  const checkArrows = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
      setTimeout(checkArrows, 300);
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
      setTimeout(checkArrows, 300);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/attractions/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        setAttractions(
          attractions.filter((attraction) => attraction.id !== id)
        );
        alert("Attraction deleted successfully");
        setTimeout(checkArrows, 100); // Ensure arrows update after deletion
      } else {
        alert("Failed to delete attraction");
      }
    } catch (error) {
      console.error("Error deleting attraction:", error);
    }
  };

  return (
    <Box sx={{ mt: 5, mb: 5, position: "relative" }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Explore Attractions
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{ display: "flex", alignItems: "center", position: "relative" }}
        >
          {showLeftArrow && (
            <IconButton
              onClick={handleScrollLeft}
              sx={{
                position: "absolute",
                left: 0,
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
              }}
            >
              <ArrowBackIos />
            </IconButton>
          )}
          <Box
            ref={containerRef}
            sx={{
              display: "flex",
              overflowX: "hidden",
              flexGrow: 1,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            onScroll={checkArrows}
          >
            {attractions.map((attraction) => (
              <CardLandingPage
                key={attraction.id}
                attraction={{
                  id: attraction.id,
                  name: attraction.title || "Unknown",
                  location: attraction.address || "Unknown location",
                  description:
                    attraction.subtitle || "No description available.",
                  coordinates: attraction.cords,
                  image: require("../images/Logo-NoBG.png"), // Placeholder image URL
                }}
                isAdmin={user && user.role === "admin"}
                onDelete={handleDelete}
              />
            ))}
          </Box>
          {showRightArrow && (
            <IconButton
              onClick={handleScrollRight}
              sx={{
                position: "absolute",
                right: 0,
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AttractionsLandingPage;
