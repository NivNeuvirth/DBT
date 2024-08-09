import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography, IconButton, CssBaseline, Box } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import fetchAttractions from "../components/FetchAttractions";
import CardAttraction from "../components/CardAttraction";
import { UserContext } from "../context/UserContext";

const Discover = () => {
  const [attractions, setAttractions] = useState([]);
  const { user } = useContext(UserContext);
  const [currentIndex, setCurrentIndex] = useState({});

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

  const groupByCategory = (attractions) => {
    return attractions.reduce((acc, attraction) => {
      const category = attraction["Attraction Category"] || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(attraction);
      return acc;
    }, {});
  };

  const groupedAttractions = groupByCategory(attractions);

  const handleNext = (category, itemsPerPage) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [category]: (prevIndex[category] || 0) + itemsPerPage,
    }));
  };

  const handlePrev = (category, itemsPerPage) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [category]: Math.max((prevIndex[category] || 0) - itemsPerPage, 0),
    }));
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
      {Object.keys(groupedAttractions).map((category) => {
        const itemsPerPage = 3; // Adjust this value based on screen size
        const startIndex = currentIndex[category] || 0;
        const endIndex = startIndex + itemsPerPage;
        const visibleAttractions = groupedAttractions[category].slice(
          startIndex,
          endIndex
        );

        return (
          <div key={category}>
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
              {category}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <IconButton
                onClick={() => handlePrev(category, itemsPerPage)}
                sx={{
                  position: "absolute",
                  left: 0,
                  zIndex: 1,
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
                }}
              >
                <ArrowBackIos />
              </IconButton>
              <Grid
                container
                spacing={2}
                wrap="nowrap"
                sx={{
                  overflowX: "hidden",
                  paddingBottom: 2,
                  flexGrow: 1,
                }}
              >
                {visibleAttractions.map((attraction, index) => (
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
                        "Attraction Name":
                          attraction["Attraction Name"] || "Unknown",
                        "Attraction City":
                          attraction["Attraction City"] || "Unknown location",
                        "Attraction Description":
                          attraction["Attraction Description"] ||
                          "No description available.",
                        "Attraction Address":
                          attraction["Attraction Address"] ||
                          "No address available.",
                        "Attraction Phone":
                          attraction["Attraction Phone"] ||
                          "No phone available.",
                        "Attraction Site":
                          attraction["Attraction Site"] ||
                          "No website available.",
                        "Image Link":
                          attraction["Image Link"] ||
                          require("../images/Pure_logo_yellow_upscaled.png"),
                      }}
                      isAdmin={user && user.role === "admin"}
                      onDelete={handleDelete}
                    />
                  </Grid>
                ))}
              </Grid>
              <IconButton
                onClick={() => handleNext(category, itemsPerPage)}
                sx={{
                  position: "absolute",
                  right: 0,
                  zIndex: 1,
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </div>
        );
      })}
    </Box>
  );
};

export default Discover;
