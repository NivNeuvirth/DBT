import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Import the custom hook for authentication
import AttractionDialog from "./AttractionDialog"; // Import the dialog component

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  maxHeight: 300,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const getFontSize = (nameLength) => {
  if (nameLength > 40) return "1rem"; // Smaller font size for very long names
  if (nameLength > 30) return "1.25rem"; // Slightly smaller font for long names
  return "1.5rem"; // Default font size
};

const CardAttraction = ({ attraction, isAdmin, onDelete }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false); // State for managing favorite status
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nameFontSize = getFontSize(attraction["Attraction Name"].length);

  // Define the default logo path
  const defaultLogoPath = require("../images/Pure_logo_yellow_upscaled.png");
  // Determine if the image is the default logo
  const isDefaultLogo = attraction["Image Link"] === defaultLogoPath;

  useEffect(() => {
    // Fetch user favorites when the component mounts
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        "https://dbt-8bqc.onrender.com/api/favorites",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const favorites = await response.json();

      // Convert the favorites array to a Set for efficient lookup
      const favoritesSet = new Set(favorites);

      // Check if the current attraction is a favorite
      setIsFavorited(favoritesSet.has(attraction.ID));
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };

  const handleFavoriteClick = async (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    if (!user) {
      navigate("/Login"); // Redirect to signup page if user is not signed in
    } else {
      try {
        const response = await fetch(
          "https://dbt-8bqc.onrender.com/api/favorites",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ attractionId: attraction.ID }),
          }
        );

        const favorites = await response.json();

        // Convert the favorites array to a Set for efficient lookup
        const favoritesSet = new Set(favorites);

        // Check if the current attraction is a favorite
        setIsFavorited(favoritesSet.has(attraction.ID));
      } catch (error) {
        console.error("Failed to update favorites:", error);
      }
    }
  };

  return (
    <>
      <StyledCard theme={theme}>
        <CardMedia
          component="div"
          sx={{
            height: 200,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={
              attraction["Image Link"] ||
              require("../images/Pure_logo_yellow_upscaled.png")
            }
            alt={attraction["Attraction Name"]}
            style={{
              width: "100%",
              height: "100%",
              objectFit: isDefaultLogo ? "fill" : "cover",
            }}
          />
        </CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: nameFontSize,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {attraction["Attraction Name"]}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            {attraction["Attraction City"]}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          {isAdmin && (
            <IconButton
              onClick={() => onDelete(attraction.ID)}
              sx={{ color: "error.main" }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              color: isFavorited ? "red" : "black",
            }}
          >
            {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Button
            sx={{
              backgroundColor: "#0e3c34",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#0e3c34",
              },
              marginLeft: "auto",
            }}
            variant="contained"
            size="small"
            onClick={handleOpen}
          >
            Learn More
          </Button>
        </CardActions>
      </StyledCard>

      <AttractionDialog
        open={open}
        onClose={handleClose}
        attraction={attraction}
      />
    </>
  );
};

export default CardAttraction;
