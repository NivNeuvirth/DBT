import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const useAuth = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const refreshToken = localStorage.getItem("refreshToken");

    if (storedUser && refreshToken) {
      fetch(`${process.env.REACT_APP_API_URL}/api/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            setUser(JSON.parse(storedUser)); // Restore user from localStorage
          } else {
            // Invalid refresh token
            localStorage.removeItem("user");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            setUser(null);
          }
        })
        .catch((error) => {
          console.error("Error refreshing token:", error.message);
          localStorage.removeItem("user");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          setUser(null);
        });
    } else {
      setUser(null); // Clear user if no user is stored
    }
  }, [setUser]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return { user, logout };
};

export default useAuth;
