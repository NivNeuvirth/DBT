// import * as React from "react";
// import Box from "@mui/material/Box";
// import { Typography, Link, Container } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";

// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         backgroundColor: "#f1f1f1",
//         padding: "10px 0",
//         marginTop: "auto",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
//           <Link
//             href="https://www.instagram.com/the_trip_insider/?igsh=MXg4ZnltamdhNHB1eg%3D%3D"
//             target="_blank"
//             rel="noopener"
//             sx={{ margin: 1 }}
//           >
//             <InstagramIcon />
//           </Link>
//         </Box>
//         <Typography
//           variant="body2"
//           color="textSecondary"
//           align="center"
//           sx={{ marginTop: 2 }}
//         >
//           © {new Date().getFullYear()} DBT
//         </Typography>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InstagramIcon from "@mui/icons-material/Instagram";

const logoStyle = {
  width: "140px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      DBT&nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: { xs: 2, sm: 4 },
        pb: { xs: 2, sm: 4 },
        width: "100%",
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{
          mb: 1,
          color: "text.secondary",
        }}
      >
        <IconButton
          color="inherit"
          href="https://www.instagram.com/the_trip_insider/?igsh=MXg4ZnltamdhNHB1eg%3D%3D"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </IconButton>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        <Link color="text.secondary" href="#">
          Privacy Policy
        </Link>
        <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
          &nbsp;•&nbsp;
        </Typography>
        <Link color="text.secondary" href="#">
          Terms of Service
        </Link>
      </Typography>
      <Copyright />
    </Box>
  );
}
