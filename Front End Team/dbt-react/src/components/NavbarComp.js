import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Fab from "@mui/material/Fab";
import { UserContext } from "../context/UserContext";
import useAuth from "../hooks/useAuth";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const pages = ["Discover", "Trips", "Tickets"];
const loggedInSettings = ["Favorites", "Logout"];
const loggedOutSettings = ["Login", "Sign Up"];

const NavbarComp = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);
  const { user } = useContext(UserContext);
  const { logout } = useAuth();
  const navigate = useNavigate();
  let lastScrollTop = 0;

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    // Perform search or navigate to a search results page
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

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

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    handleCloseUserMenu();
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop <= 0) {
      setIsNavbarVisible(true); // Show navbar when at the top of the page
    } else {
      setIsNavbarVisible(false); // Keep navbar hidden when not at the top
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Update the last scroll position

    setShowScrollToTop(scrollTop > 200); // Show scroll-to-top button after scrolling down 200px
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
          paddingBottom: 2,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transform: isNavbarVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            variant="regular"
            sx={() => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Link to={"/"}>
                <img
                  src={require("../images/Logo-NoBG.png")}
                  alt="Logo"
                  style={{ width: "140px", height: "auto", cursor: "pointer" }}
                />
              </Link>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ color: "#0e3c34" }}
                  >
                    <Typography variant="body2" color="#0e3c34">
                      <Link
                        style={{ textDecoration: "none", color: "#0e3c34" }}
                        to={`/${page}`}
                      >
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "20px",
                bgcolor: showSearch ? "white" : "transparent",
                boxShadow: showSearch ? "0 0 10px rgba(0,0,0,0.2)" : "none",
                transition: "all 0.3s ease",
                width: showSearch ? "200px" : "40px",
                overflow: "hidden",
                mr: 2,
              }}
            >
              <IconButton onClick={toggleSearch} sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
              {showSearch && (
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  sx={{
                    flexGrow: 1,
                    borderRadius: "20px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {user ? (
                <div>
                  <AccountCircleIcon
                    sx={{
                      color: "#0e3c34",
                      cursor: "pointer",
                      fontSize: 40,
                    }}
                    onClick={handleOpenUserMenu}
                  />
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem disabled>
                      <Typography textAlign="center">
                        Welcome, {user.name}!
                      </Typography>
                    </MenuItem>
                    <Divider />
                    {loggedInSettings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={
                          setting === "Logout"
                            ? handleLogout
                            : () => handleMenuClick(`/${setting.toLowerCase()}`)
                        }
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ) : (
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    gap: 0.5,
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{ color: "#0e3c34" }}
                    variant="text"
                    size="small"
                    onClick={() => handleMenuClick("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#0e3c34",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#0e3c34",
                      },
                    }}
                    variant="contained"
                    size="small"
                    onClick={() => handleMenuClick("/sign up")}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                aria-label="menu"
                onClick={handleOpenMenu}
                sx={{ minWidth: "30px", p: "4px", color: "#0e3c34" }}
              >
                <MenuIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <Box
                  sx={{
                    minWidth: "100px",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      flexGrow: 1,
                    }}
                  ></Box>
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography variant="body2" color="text.primary">
                        <Link
                          style={{ textDecoration: "none", color: "#0e3c34" }}
                          to={`/${page}`}
                        >
                          {page}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                  <Divider />
                  {user
                    ? loggedInSettings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={
                            setting === "Logout"
                              ? handleLogout
                              : () =>
                                  handleMenuClick(`/${setting.toLowerCase()}`)
                          }
                        >
                          <Typography
                            textAlign="center"
                            style={{ color: "#0e3c34", cursor: "pointer" }}
                          >
                            {setting}
                          </Typography>
                        </MenuItem>
                      ))
                    : loggedOutSettings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={() =>
                            handleMenuClick(`/${setting.toLowerCase()}`)
                          }
                        >
                          <Typography
                            textAlign="center"
                            style={{ color: "#0e3c34", cursor: "pointer" }}
                          >
                            {setting}
                          </Typography>
                        </MenuItem>
                      ))}
                </Box>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {showScrollToTop && (
        <Fab
          color="primary"
          size="small"
          onClick={handleScrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            left: 16,
            zIndex: (theme) => theme.zIndex.tooltip,
            backgroundColor: "#0e3c34",
            color: "white",
            "&:hover": {
              backgroundColor: "#0e3c34", // Keep the same background color on hover
            },
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </>
  );
};

export default NavbarComp;
