import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { UserContext } from "../context/UserContext";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const pages = ["Discover", "Trips", "Tickets"];
const loggedInSettings = ["Profile", "Settings", "Logout"];
const loggedOutSettings = ["Login", "Sign Up"];

const NavbarComp = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user } = useContext(UserContext); // Use the context
  const { logout } = useAuth(); // Use the custom hook
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate("/Login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar disableGutters>
          <Link to={"/home"}>
            <img
              src={require("../images/Logo-NoBG.png")}
              alt="Logo"
              className="navbar-logo"
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#006400"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ textDecoration: "none", color: "#006400" }}
                      to={`/${page}`}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#006400",
                  display: "block",
                  fontSize: "1.25rem",
                  textTransform: "none",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "#006400" }}
                  to={`/${page}`}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {user && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ marginRight: 2, color: "#006400" }}
              >
                Hi {user.name}!
              </Typography>
            )}
            <IconButton>
              <ShoppingCartCheckoutOutlinedIcon
                fontSize="large"
                sx={{ color: "#006400" }}
              />
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <PersonOutlineIcon
                  fontSize="large"
                  sx={{ color: "#006400", p: 0 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user
                ? loggedInSettings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={
                        setting === "Logout"
                          ? handleLogout
                          : handleCloseUserMenu
                      }
                    >
                      {setting === "Logout" ? (
                        <Typography
                          textAlign="center"
                          style={{ color: "#006400", cursor: "pointer" }}
                        >
                          {setting}
                        </Typography>
                      ) : (
                        <Link
                          style={{ textDecoration: "none", color: "#006400" }}
                          to={`/${setting.toLowerCase()}`}
                        >
                          {setting}
                        </Link>
                      )}
                    </MenuItem>
                  ))
                : loggedOutSettings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "#006400" }}
                        to={`/${setting.toLowerCase()}`}
                      >
                        {setting}
                      </Link>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarComp;
