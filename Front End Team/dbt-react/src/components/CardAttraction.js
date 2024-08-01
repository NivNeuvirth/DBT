import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const CardAttraction = ({ attraction, isAdmin, onDelete }) => {
  const theme = useTheme();

  return (
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
          src={attraction.image}
          alt={attraction.name}
          style={{ width: "100%", height: "auto" }}
        />
      </CardMedia>
      <CardContent sx={{ flex: "1 1 auto", padding: 3 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {attraction.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          {attraction.location}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 2, textAlign: "justify" }}
        >
          {attraction.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Learn More
        </Button>
        {isAdmin && (
          <IconButton
            onClick={() => onDelete(attraction.id)}
            sx={{ color: "error.main" }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </StyledCard>
  );
};

export default CardAttraction;
