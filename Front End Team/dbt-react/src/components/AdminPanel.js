import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const AdminPanel = () => {
  const { user } = useContext(UserContext);
  const [attractions, setAttractions] = useState([]);

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

  if (!user || user.role !== "admin") {
    return <div>Access denied. Admins only.</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
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
    </div>
  );
};

export default AdminPanel;
