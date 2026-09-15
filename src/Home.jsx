import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      
       {/* <nav className="navbar">
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
      </nav>  */}

      <section className="smartqueue">
        <div className="smartqueue-content">
          <p className="title">SMART QUEUE SYSTEM</p>
          
          <h1>
            Skip the Queue,
            <br />
            <span>Save Your Time.</span>
          </h1>

          <p className="description">
            Get your token online and avoid standing
            in long queues. Track your queue easily
            from anywhere.
          </p>

          <Link to="/get-token">
         <button className="getbutton"> Get Token Now →</button>
        </Link>

        </div>


        <div className="image">
          <div className="illustration">
            👩🏻‍💼 🧑🏻‍💼 🧑🏻‍💼
          </div>
        </div>

      </section>
      <section className="features">
        <div className="feature-card">
          <div className="icon">🏷️</div>
          <h3>Easy Token<br />Booking</h3>
          <p>
            Get your token in
            just a few clicks
          </p>
        </div>


        <div className="feature-card">
          <div className="icon">📊</div>
          <h3>Live Queue<br />Status</h3>
          <p>
            Track live status and
            know your turn
          </p>
        </div>


        <div className="feature-card">
          <div className="icon">🕐</div>
          <h3>Less Waiting<br />Time</h3>
          <p>
            Spend your time
            where it matters
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;


