import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import NavbarComp from "./components/NavbarComp";
import YourTrips from "./components/YourTrips";
import Home from "./components/Home";
import Tickets from "./components/Tickets";
import Discover from "./components/Discover";
import backgroundImage from "./images/Cover.jpg";
import SignUp from "./components/SignUp";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import Success from "./components/Success";
import { UserProvider } from "./context/UserContext";

const appStyle = {
  // backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div style={appStyle}>
          <NavbarComp />
          <ChatBot />
          <div>
            <Routes>
              <Route path="/Trips" element={<YourTrips />} />
              <Route path="/home" element={<Home />} />
              <Route path="/Tickets" element={<Tickets />} />
              <Route path="/Discover" element={<Discover />} />
              <Route path="/Success" element={<Success />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Sign Up" element={<SignUp />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
