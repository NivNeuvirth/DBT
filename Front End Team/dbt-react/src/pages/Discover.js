import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import fetchAttractions from "../components/FetchAttractions";
import CardAttraction from "../components/CardAttraction";
import { UserContext } from "../context/UserContext";
import { CssBaseline, Box } from "@mui/material";

const Discover = () => {
  const [attractions, setAttractions] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getAttractions = async () => {
      const data = await fetchAttractions();
      setAttractions(data);
    };
    getAttractions();
  }, []);

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
      } else {
        alert("Failed to delete attraction");
      }
    } catch (error) {
      console.error("Error deleting attraction:", error);
    }
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
      <Grid container spacing={4}>
        {attractions.map((attraction, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardAttraction
              attraction={{
                id: attraction.id,
                name: attraction.title || "Unknown",
                location: attraction.address || "Unknown location",
                description: attraction.subtitle || "No description available.",
                coordinates: attraction.cords,
                image: require("../images/Logo-NoBG.png"), // Placeholder image URL
              }}
              isAdmin={user && user.role === "admin"}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Discover;
