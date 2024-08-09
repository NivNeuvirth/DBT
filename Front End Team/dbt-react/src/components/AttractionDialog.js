// AttractionDialog.js

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const AttractionDialog = ({ open, onClose, attraction }) => {
  if (!attraction) return null; // Ensure attraction is provided

  // Define the default logo path
  const defaultLogoPath = require("../images/Pure_logo_yellow_upscaled.png");

  // Determine if the image is the default logo
  const isDefaultLogo =
    !attraction["Image Link"] || attraction["Image Link"] === defaultLogoPath;

  // Pre-compute the image source
  const imageUrl = isDefaultLogo ? defaultLogoPath : attraction["Image Link"];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md" // Set max width of the dialog
      fullWidth // Make the dialog take full width
      sx={{
        "& .MuiDialog-paper": {
          backgroundImage: `url(${imageUrl})`, // Use image as background
          backgroundSize: isDefaultLogo ? "contain" : "cover",
          backgroundPosition: "center",
          color: "white", // Ensure text is readable on dark backgrounds
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Overlay for text readability
          padding: 3,
          borderRadius: 1,
        }}
      >
        <DialogTitle
          textAlign="center"
          fontSize={25}
          fontWeight="fontWeightBold"
        >
          {attraction["Attraction Name"]}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            <Box component="span" fontWeight="fontWeightBold">
              Website:
            </Box>{" "}
            <a
              href={attraction["Attraction Site"]}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#90caf9" }} // Link color for better visibility
            >
              {attraction["Attraction Site"] || "No website available."}
            </a>
          </Typography>

          <Typography variant="body2" gutterBottom>
            <Box component="span" fontWeight="fontWeightBold">
              City:
            </Box>{" "}
            {attraction["Attraction City"] || "No city available."}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <Box component="span" fontWeight="fontWeightBold">
              Address:
            </Box>{" "}
            {attraction["Attraction Address"] || "No address available."}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <Box component="span" fontWeight="fontWeightBold">
              Phone:
            </Box>{" "}
            {attraction["Attraction Phone"] || "No phone available."}
          </Typography>
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Different background for description
              padding: 2,
              marginTop: 2,
              borderRadius: 1,
            }}
          >
            <Typography variant="body1">
              {attraction["Attraction Description"] ||
                "No description available."}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000",
              "&:hover": {
                backgroundColor: "#FFFFFF",
              },
              marginLeft: "auto",
            }}
            variant="contained"
            size="small"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AttractionDialog;
