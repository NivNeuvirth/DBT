import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CardLandingPage = ({ attraction, isAdmin, onDelete }) => (
  <Card
    sx={{
      minWidth: 345,
      m: 2,
      boxShadow: 3,
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: 6,
      },
    }}
  >
    <CardMedia
      component="img"
      height="140"
      image={attraction.image}
      alt={attraction.name}
      sx={{ objectFit: "cover" }} // Ensure the image fills the card
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {attraction.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {attraction.location}
      </Typography>
      {isAdmin && (
        <IconButton onClick={() => onDelete(attraction.id)}>
          <DeleteIcon />
        </IconButton>
      )}
    </CardContent>
  </Card>
);

export default CardLandingPage;
