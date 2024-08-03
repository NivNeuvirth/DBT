import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AttractionsIcon from "@mui/icons-material/Place";
import PeopleIcon from "@mui/icons-material/People";
import UsersTable from "./UsersTable";

const Home = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <Typography variant="h4" align="center">
      Admin Panel
    </Typography>
  </Box>
);

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
  const [selectedComponent, setSelectedComponent] = useState("home");
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

  const handleEditUser = async (updatedUser) => {
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
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height to center vertically
          padding: 4, // Add padding for spacing
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontSize: 24 }}>
          Access denied. Admins only.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "hidden", // Disable scrolling for the entire page
          padding: 1,
          paddingTop: 10, // Add top padding for navigation
          paddingBottom: 1, // Add bottom padding for navigation
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
      <BottomNavigation
        value={selectedComponent}
        onChange={(event, newValue) => {
          setSelectedComponent(newValue);
        }}
        showLabels
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Attractions"
          value="attractions"
          icon={<AttractionsIcon />}
        />
        <BottomNavigationAction
          label="Users"
          value="users"
          icon={<PeopleIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
