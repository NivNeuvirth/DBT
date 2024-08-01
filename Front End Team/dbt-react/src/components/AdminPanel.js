import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  styled,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import AttractionsIcon from "@mui/icons-material/Place";
import PeopleIcon from "@mui/icons-material/People";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import UsersTable from "./UsersTable";
import UserEditDialog from "./UserEditDialog"; // Import the UserEditDialog component

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

const Home = () => <h1>Home</h1>;

const Attractions = ({ attractions, deleteAttraction }) => (
  <Box sx={{ mt: 5, mb: 5 }}>
    <ul>
      {attractions.map((attraction) => (
        <li key={attraction.id}>
          {attraction.title} - {attraction.subtitle}
          <button onClick={() => deleteAttraction(attraction.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </Box>
);

const Users = ({ users, onEdit }) => (
  <UsersTable users={users} onEdit={onEdit} />
);

export default function AdminPanel() {
  const [open, setOpen] = React.useState(true);
  const [selectedComponent, setSelectedComponent] = useState("home");
  const [editingUser, setEditingUser] = useState(null);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { user } = useContext(UserContext);
  const [attractions, setAttractions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/api/data", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAttractions(data))
      .catch((error) => console.error("Error fetching attractions:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3005/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const deleteAttraction = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/attractions/${id}`,
        {
          method: "DELETE",
          headers: {
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

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditingUser(null);
        alert("User updated successfully");
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user || user.role !== "admin") {
    return <div>Access denied. Admins only.</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: [1],
              paddingTop: theme.spacing(13), // Add top padding here
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{
                marginRight: "36px",
              }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItem button onClick={() => setSelectedComponent("home")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              onClick={() => setSelectedComponent("attractions")}
            >
              <ListItemIcon>
                <AttractionsIcon />
              </ListItemIcon>
              <ListItemText primary="Attractions" />
            </ListItem>
            <ListItem button onClick={() => setSelectedComponent("users")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            paddingTop: theme.spacing(13), // Add top padding here
            paddingLeft: open ? drawerWidth : theme.spacing(9),
            transition: theme.transitions.create("padding-left", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          {selectedComponent === "home" && <Home />}
          {selectedComponent === "attractions" && (
            <Attractions
              attractions={attractions}
              deleteAttraction={deleteAttraction}
            />
          )}
          {selectedComponent === "users" && (
            <Users users={users} onEdit={handleEditUser} />
          )}
        </Box>
      </Box>
      <UserEditDialog
        open={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        user={editingUser || {}}
        onSave={handleSaveUser}
      />
    </ThemeProvider>
  );
}
