import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NavbarComp from "./components/NavbarComp";
import YourTrips from "./pages/YourTrips";
import Tickets from "./pages/Tickets";
import Discover from "./pages/Discover";
import SignUp from "./pages/SignUp";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import Success from "./components/Success";
import { UserProvider } from "./context/UserContext";
import AdminPanel from "./components/AdminPanel";
import LandingPage from "./pages/LandingPage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

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
            <Route path="/Tickets" element={<Tickets />} />
            <Route path="/Discover" element={<Discover />} />
            <Route path="/Success" element={<Success />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Sign Up" element={<SignUp />} />
            <Route path="/Favorites" element={<FavoritesPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/Admin Panel" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
