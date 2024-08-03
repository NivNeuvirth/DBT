import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NavbarComp from "./components/NavbarComp";
import YourTrips from "./pages/YourTrips";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import Discover from "./pages/Discover";
import SignUp from "./pages/SignUp";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import Success from "./components/Success";
import { UserProvider } from "./context/UserContext";
import AdminPanel from "./components/AdminPanel";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <NavbarComp />
        <ChatBot />
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Trips" element={<YourTrips />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Tickets" element={<Tickets />} />
            <Route path="/Discover" element={<Discover />} />
            <Route path="/Success" element={<Success />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Sign Up" element={<SignUp />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
