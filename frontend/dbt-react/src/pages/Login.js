import React, { useState, useContext } from "react";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
  Alert,
  Box,
} from "@mui/material";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const paperStyle = {
    padding: "20px",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#0e3c34", margin: "10px 0 20px 0" };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear any existing error message

    try {
      const response = await fetch("https://dbt-8bqc.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({ name: result.user.name, role: result.user.role })
        ); // Store user info
        localStorage.setItem("refreshToken", result.refreshToken);
        localStorage.setItem("accessToken", result.accessToken);
        setUser({ name: result.user.name, role: result.user.role }); // Set user in context
        navigate("/");
      } else {
        setErrorMessage(result.error); // Set error message from server
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <CssBaseline />
      <Grid
        style={{
          padding: "20px",
          paddingTop: "80px",
          width: "100%",
          backgroundImage: "linear-gradient(180deg, #FDE791, #FFF)",
          backgroundSize: "100% 150px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockPersonOutlinedIcon />
            </Avatar>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              placeholder="Enter Email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              placeholder="Enter Password"
              type="password"
              fullWidth
              required
              style={{ margin: "10px 0" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errorMessage && (
              <Alert severity="error" style={{ margin: "10px 0" }}>
                {errorMessage}
              </Alert>
            )}

            <FormControlLabel
              control={<Checkbox defaultChecked style={{ color: "#0e3c34" }} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#0e3c34", margin: "8px 0" }}
            >
              Log In
            </Button>
          </form>
          <Typography>
            <Link href="#" underline="hover" sx={{ color: "#0e3c34" }}>
              Forgot password?
            </Link>
          </Typography>
          <Button
            style={{ backgroundColor: "#f2bb2a", margin: "35px auto" }}
            fullWidth
            variant="contained"
          >
            <Link href="/Sign Up" underline="none" color="white">
              Create an account
            </Link>
          </Button>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Login;
