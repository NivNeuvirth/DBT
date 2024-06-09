import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import NavbarComp from "./components/NavbarComp"
import YourTrips from "./components/YourTrips";
import Home from "./components/Home";
import Tickets from "./components/Tickets";
import Discover from "./components/Discover";
import backgroundImage from './images/Cover.jpg';
import SignUp from "./components/SignUp";


const appStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

function App() {
  return (
    <Router>
      <div style={appStyle}>
        <NavbarComp />
          <div>
            <Routes>
              <Route path="/Trips" element={<YourTrips />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/Tickets" element={<Tickets />}/>
              <Route path="/Discover" element={<Discover />}/>
              <Route path="/Login" element={<Login />}/>
              <Route path="/Sign-up" element={<SignUp />}/>
            </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;
