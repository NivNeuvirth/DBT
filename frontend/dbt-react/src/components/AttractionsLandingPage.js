import React, { useState, useEffect, useContext, useRef } from "react";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import fetchAttractions from "./FetchAttractions";
import CardLandingPage from "./CardLandingPage";
import { UserContext } from "../context/UserContext"; // Adjust the import path as necessary
import AttractionDialog from "./AttractionDialog"; // Import the new dialog component

const AttractionsLandingPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttraction, setSelectedAttraction] = useState(null); // State for selected attraction
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
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
        left: -containerRef.current.clientWidth, // Scroll by the width of the visible area
        behavior: "smooth",
      });
      setTimeout(checkArrows, 300);
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth, // Scroll by the width of the visible area
        behavior: "smooth",
      });
      setTimeout(checkArrows, 300);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://dbt-8bqc.onrender.com/api/attractions/${id}`,
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

  const handleCardClick = (attraction) => {
    setSelectedAttraction(attraction);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedAttraction(null);
  };

  return (
    <Box sx={{ mt: 5, mb: 5, position: "relative", paddingTop: "20px" }}>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        gutterBottom
        color={"#0e3c34"}
      >
        Explore Top Attractions
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
            {attractions
              .filter((attraction) => attraction["Top Choice?"] === 1) // Filter for top choice attractions
              .map((attraction) => (
                <Box
                  key={attraction.ID}
                  onClick={() => handleCardClick(attraction)}
                >
                  <CardLandingPage
                    attraction={{
                      "Attraction Name":
                        attraction["Attraction Name"] || "Unknown",
                      "Attraction City":
                        attraction["Attraction City"] || "Unknown location",
                      "Image Link":
                        attraction["Image Link"] ||
                        require("../images/Pure_logo_yellow_upscaled.png"),
                      ID: attraction.ID, // Ensure the id is passed for deletion
                      Description:
                        attraction.Description || "No description available.",
                      Website: attraction.Website || "No website available.",
                      Address: attraction.Address || "No address available.",
                    }}
                    isAdmin={user && user.role === "admin"}
                    onDelete={handleDelete}
                  />
                </Box>
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
      <AttractionDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        attraction={selectedAttraction}
      />
    </Box>
  );
};

export default AttractionsLandingPage;
