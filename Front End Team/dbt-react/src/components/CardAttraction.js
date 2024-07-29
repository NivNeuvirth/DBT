import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const CardAttraction = ({ attraction, isAdmin, onDelete }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={attraction.image}
        alt={attraction.name}
      />
      <CardContent sx={{ flex: "1 1 auto" }}>
        <Typography gutterBottom variant="h5" component="div">
          {attraction.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {attraction.location}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          {attraction.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small">Learn More</Button>
        {isAdmin && (
          <IconButton onClick={() => onDelete(attraction.id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default CardAttraction;
