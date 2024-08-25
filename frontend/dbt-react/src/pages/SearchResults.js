import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography, Box, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";
import CardAttraction from "../components/CardAttraction";
import { UserContext } from "../context/UserContext";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://dbt-8bqc.onrender.com/api/search?query=${query}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

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
          paddingBottom: "20px",
        }}
      >
        Search Results for "{query}"
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {results.length > 0 ? (
          results.map((attraction, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              sx={{
                overflow: "hidden",
                height: "350px", // Adjust as needed
                width: "350px", // Adjust as needed
              }}
            >
              <CardAttraction
                attraction={{
                  ID: attraction.ID,
                  "Attraction Name": attraction["Attraction Name"] || "Unknown",
                  "Attraction City":
                    attraction["Attraction City"] || "Unknown location",
                  "Attraction Description":
                    attraction["Attraction Description"] ||
                    "No description available.",
                  "Attraction Address":
                    attraction["Attraction Address"] || "No address available.",
                  "Attraction Phone":
                    attraction["Attraction Phone"] || "No phone available.",
                  "Attraction Site":
                    attraction["Attraction Site"] || "No website available.",
                  "Image Link":
                    attraction["Image Link"] ||
                    require("../images/Pure_logo_yellow_upscaled.png"),
                }}
                isAdmin={user && user.role === "admin"}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No results found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default SearchResults;
