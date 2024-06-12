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
} from "@mui/material";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";

const Login = () => {
  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#006400", margin: "10px 0 20px 0" };
  // const backgroundStyle = {
  //     backgroundImage: `url(${backgroundImage})`, // Update this with your image path
  //     backgroundSize: 'cover',
  //     backgroundPosition: 'center',
  //     height: '100vh',
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center' };

  return (
    <Grid /*container style={backgroundStyle} */>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockPersonOutlinedIcon />
          </Avatar>
        </Grid>
        <TextField label="Email" placeholder="Enter Email" fullWidth required />
        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          required
          style={{ margin: "10px 0" }}
        />
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
          <Link href="/Sign-up" underline="none" color="white">
            Create an account
          </Link>
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
