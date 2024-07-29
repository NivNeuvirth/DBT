import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NavbarComp from "./components/NavbarComp";
import YourTrips from "./pages/YourTrips";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import Discover from "./pages/Discover";
import backgroundImage from "./images/Cover.jpg";
import SignUp from "./pages/SignUp";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import Success from "./components/Success";
import { UserProvider } from "./context/UserContext";
import AdminPanel from "./components/AdminPanel";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Navigate } from "react-router-dom";

const appStyle = {
  // backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const AdminRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user && user.role === "admin" ? children : <Navigate to="/login" />;
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
              <Route path="/admin" element={<AdminPanel />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

///////////////////////////////////////////////////////////////////////////////////////////
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import NavbarComp from "./components/NavbarComp";
// import YourTrips from "./pages/YourTrips";
// import Home from "./pages/Home";
// import Tickets from "./pages/Tickets";
// import Discover from "./pages/Discover";
// import SignUp from "./pages/SignUp";
// import ChatBot from "./components/ChatBot";
// import Footer from "./components/Footer";
// import Success from "./components/Success";
// import { UserProvider, UserContext } from "./context/UserContext";
// import AdminPanel from "./components/AdminPanel";
// import { useContext } from "react";

// const appStyle = {
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   minHeight: "100vh",
//   display: "flex",
//   flexDirection: "column",
// };

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(UserContext);
//   return user ? children : <Navigate to="/login" />;
// };

// const AdminRoute = ({ children }) => {
//   const { user } = useContext(UserContext);
//   return user && user.role === "admin" ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         <div style={appStyle}>
//           <NavbarComp />
//           <ChatBot />
//           <div>
//             <Routes>
//               <Route path="/Trips" element={<ProtectedRoute><YourTrips /></ProtectedRoute>} />
//               <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
//               <Route path="/Tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
//               <Route path="/Discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
//               <Route path="/Success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/Sign Up" element={<SignUp />} />
//               <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
//             </Routes>
//           </div>
//           <Footer />
//         </div>
//       </Router>
//     </UserProvider>
//   );
// }

// export default App;
