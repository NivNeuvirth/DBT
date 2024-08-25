import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  CssBaseline,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CardLandingPage from "../components/CardLandingPage";
import { UserContext } from "../context/UserContext"; // Adjust the import path as necessary
import AttractionDialog from "../components/AttractionDialog"; // Import the dialog component
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttraction, setSelectedAttraction] = useState(null); // State for selected attraction
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
  const { user } = useContext(UserContext);
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserFavorites();
    } else {
      navigate("/Login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      checkArrows();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [favorites]);

  const fetchUserFavorites = async () => {
    try {
      const response = await fetch(
        "https://dbt-8bqc.onrender.com/api/user-favorites",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user favorites");
      }

      const data = await response.json();
      setFavorites(data); // Set the favorites state with the fetched data
      setLoading(false);
      setTimeout(checkArrows, 100); // Check arrows after loading
    } catch (error) {
      console.error("Failed to fetch user favorites:", error);
      setLoading(false);
    }
  };

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

  const handleCardClick = (attraction) => {
    setSelectedAttraction(attraction);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedAttraction(null);
  };

  return (
    <Box
      style={{
        padding: "20px",
        paddingTop: "100px",
        width: "100%",
        backgroundImage: "linear-gradient(180deg, #FDE791, #FFF)",
        backgroundSize: "100% 150px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CssBaseline />
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#0e3c34",
          textTransform: "uppercase",
          letterSpacing: "2px",
          marginBottom: "20px",
          textAlign: "center",
          paddingTop: "20px",
        }}
      >
        Your Favorite Attractions
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
            {favorites.map((attraction) => (
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

export default FavoritesPage;
