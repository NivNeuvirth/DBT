import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { CircularProgress, Typography, Box, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";

const geoUrl =
  "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const colorScale = scaleLinear()
  .domain([0, 6300000])
  .range(["#ffedea", "#ff5233"]);

const Map = () => {
  const [countries, setCountries] = useState([]);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  const getData = () => {
    fetch("http://localhost:3004/countries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      id="image"
      sx={(theme) => ({
        mt: { xs: 8, sm: 10 },
        mx: "auto", // center the box horizontally
        maxWidth: "95%", // to ensure it's not too wide
        alignSelf: "center",
        height: { xs: 200, sm: 700 },
        width: "100%",

        backgroundSize: "cover",
        borderRadius: "10px",
        outline: "1px solid",
        outlineColor: alpha("#BFCCD9", 0.5),
        boxShadow: `0 0 12px 8px ${alpha("#FDE791", 0.2)}`,
        position: "relative", // allows positioning of child elements
      })}
    >
      <Typography
        variant="h5" // Changed from h4 to h6 for smaller text
        sx={{
          color: "white",
          backgroundColor: alpha("#000", 0.5),
          padding: "6px 15px",
          borderRadius: "8px",
          boxShadow: `0 4px 10px ${alpha("#000", 0.3)}`,
          fontWeight: "bold",
          textAlign: "center",
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
        }}
      >
        Where to NEXT? Explore the world with our interactive map
      </Typography>
      {countries.length > 0 ? (
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147,
          }}
          style={{ width: "100%", height: "100%", backgroundColor: "" }} // set the background color here
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Sphere stroke="#DDD" strokeWidth={0.5} />
            <Graticule stroke="#DDD" strokeWidth={0.5} />
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = countries.find((s) => s.ISO_A3 === geo.id);
                  return (
                    <Tooltip
                      key={geo.rsmKey}
                      title={geo.properties.name || ""}
                      placement="top"
                      arrow
                    >
                      <Geography
                        geography={geo}
                        fill={
                          d ? colorScale(d["population_density"]) : "#f2bb2a"
                        }
                        style={{
                          default: {
                            outline: "none",
                            stroke: "white", // set the stroke color
                            strokeWidth: 1, // set the stroke width
                          },
                          hover: {
                            fill: "#0e3c34",
                            outline: "none",
                          },
                          pressed: {
                            outline: "none",
                          },
                        }}
                      />
                    </Tooltip>
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default Map;
