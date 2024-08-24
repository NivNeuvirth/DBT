import React, { useState, useEffect } from "react";
import { Card, CardMedia, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CardLandingPage = ({ attraction, isAdmin, onDelete }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Define the default logo path
  const defaultLogoPath = require("../images/Pure_logo_yellow_upscaled.png");
  // Determine if the image is the default logo
  const isDefaultLogo = attraction["Image Link"] === defaultLogoPath;

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/favorites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }

      const favorites = await response.json();

      if (Array.isArray(favorites)) {
        const favoritesSet = new Set(favorites);
        setIsFavorited(favoritesSet.has(attraction.ID));
      } else {
        console.error("Unexpected response format:", favorites);
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };

  const handleFavoriteClick = async (event) => {
    event.stopPropagation();
    if (!user) {
      navigate("/Login");
    } else {
      try {
        // Log the attraction ID to ensure it is defined
        console.log("Toggling favorite for attraction ID:", attraction.ID);

        const response = await fetch("http://localhost:3005/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ attractionId: attraction.ID }),
        });

        if (!response.ok) {
          throw new Error("Failed to update favorites");
        }

        const favorites = await response.json();

        if (Array.isArray(favorites)) {
          const favoritesSet = new Set(favorites);
          setIsFavorited(favoritesSet.has(attraction.ID));
        } else {
          console.error("Unexpected response format:", favorites);
        }
      } catch (error) {
        console.error("Failed to update favorites:", error);
      }
    }
  };

  return (
    <Card
      sx={{
        position: "relative",
        minWidth: 345,
        height: 200,
        m: 2,
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={attraction["Image Link"]}
        alt={attraction["Attraction Name"]}
        sx={{
          objectFit: isDefaultLogo ? "fill" : "cover",
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          p: 1,
        }}
      >
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "4px",
            color: isFavorited ? "red" : "black",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          }}
        >
          {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color="white"
          sx={{
            display: "inline",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "0 4px",
            borderRadius: "4px",
          }}
        >
          {attraction["Attraction Name"]}
        </Typography>
        <Typography
          variant="body2"
          color="white"
          sx={{
            display: "inline",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "0 4px",
            borderRadius: "4px",
            marginTop: "4px",
          }}
        >
          {attraction["Attraction City"]}
        </Typography>
        {isAdmin && (
          <IconButton
            onClick={() => onDelete(attraction.id)}
            sx={{ color: "white" }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Card>
  );
};

export default CardLandingPage;
