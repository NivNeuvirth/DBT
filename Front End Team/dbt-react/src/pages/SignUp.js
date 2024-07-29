import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Checkbox,
  Alert,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import { userSchema } from "../components/userSchema";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    accept: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error message
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage(""); // Clear any existing error message

    try {
      await userSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
      // API call to database
      const response = await fetch("http://localhost:3005/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User registered successfully", data);
        navigate("/Success");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error); // Set error message from server
      }
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  }

  const paperStyle = { padding: "30px 20px", width: 300, margin: "30px auto" };
  const avatarStyle = { backgroundColor: "#006400", margin: "10px 0 20px 0" };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AppRegistrationIcon />
          </Avatar>
          <Typography
            variant="caption"
            style={{ fontSize: "0.75rem", fontWeight: "bold" }}
          >
            Please fill out the form to create an account
          </Typography>
        </Grid>

        <form action="submit" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="Name"
            placeholder="Enter your Name"
            style={{ margin: "10px 0 0 0" }}
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
          <TextField
            fullWidth
            required
            label="Email"
            placeholder="Enter Email"
            style={{ margin: "10px 0" }}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" required>
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                name="gender"
                onChange={handleChange}
                checked={formData.gender === "male"}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                name="gender"
                onChange={handleChange}
                checked={formData.gender === "female"}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                name="gender"
                onChange={handleChange}
                checked={formData.gender === "other"}
              />
            </RadioGroup>
          </FormControl>
          {errors.gender && <div className="error">{errors.gender}</div>}
          <TextField
            fullWidth
            required
            label="Phone Number"
            placeholder="Enter Phone Number"
            style={{ margin: "10px 0 0 0" }}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <div className="error">{errors.phoneNumber}</div>
          )}
          <TextField
            fullWidth
            required
            type="date"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            style={{ margin: "10px 0 0 0" }}
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && (
            <div className="error">{errors.dateOfBirth}</div>
          )}
          <TextField
            fullWidth
            required
            label="Password"
            placeholder="Create Password"
            style={{ margin: "10px 0" }}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
          <TextField
            fullWidth
            required
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
          <FormControlLabel
            control={
              <Checkbox
                required
                style={{ color: "#006400" }}
                name="accept"
                type="checkbox"
                checked={formData.accept}
                onChange={handleChange}
              />
            }
            label="I accept the terms and conditions"
          />
          {errors.accept && <div className="error">{errors.accept}</div>}

          {errorMessage && (
            <Alert severity="error" style={{ margin: "10px 0" }}>
              {errorMessage}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#006400", margin: "8px 0" }}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;
