import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import fetchAttractions from "./FetchAttractions";
import CardAttraction from "./CardAttraction";

const Home = () => {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const getAttractions = async () => {
      const data = await fetchAttractions();
      setAttractions(data);
    };
    getAttractions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home page</h1>
      <Grid container spacing={4}>
        {attractions.map((attraction, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardAttraction
              attraction={{
                name: attraction.title || "Unknown",
                location: attraction.address || "Unknown location",
                description: attraction.subtitle || "No description available.",
                coordinates: attraction.cords,
                image: require("../images/Logo-NoBG.png"), // Placeholder image URL
              }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
