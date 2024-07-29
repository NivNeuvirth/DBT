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
} from "@mui/material";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const paperStyle = { padding: 20, width: 280, margin: "20px auto" };
  const avatarStyle = { backgroundColor: "#006400", margin: "10px 0 20px 0" };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear any existing error message

    try {
      const response = await fetch("http://localhost:3005/api/login", {
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
        navigate("/home");
      } else {
        setErrorMessage(result.error); // Set error message from server
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Grid>
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
            control={<Checkbox defaultChecked style={{ color: "#006400" }} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#006400", margin: "8px 0" }}
          >
            Log In
          </Button>
        </form>
        <Typography>
          <Link href="#" underline="hover">
            Forgot password?
          </Link>
        </Typography>
        <Button
          style={{ backgroundColor: "#00008B", margin: "35px auto" }}
          fullWidth
          variant="contained"
        >
          <Link href="/Sign Up" underline="none" color="white">
            Create an account
          </Link>
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
