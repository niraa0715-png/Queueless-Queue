import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
   <nav className="navbar">
        <div className="logo">
          <img src="/queueicon.jpeg"/>
          <span>QueueLess Queue</span>
        </div>

        <div className="navbar-link">
               <Link className="active" to="/">Home</Link>
                <Link to="/get-token">Get Token</Link>
                  <Link to="/livequeue">Live Queue </Link>
                  <Link to="/admin">Admin</Link>
       </div>
      </nav> )
}

export default Navbar;