import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import GetToken from "./GetToken";
import LiveQueue from "./liveQueue";
import Login from "./Login";
import SignIn from "./SignIn";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import QueueManagement from "./QueueManagement";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Sign In */}
        <Route path="/" element={<SignIn />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* User Home */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* Get Token */}
        <Route
          path="/get-token"
          element={
            <>
              <Navbar />
              <GetToken />
            </>
          }
        />

        {/* Live Queue */}
        <Route
          path="/liveQueue"
          element={
            <>
              <Navbar />
              <LiveQueue />
            </>
          }
        />

        {/* Admin Login */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
<Route
  path="/queue-management"
  element={<QueueManagement />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;