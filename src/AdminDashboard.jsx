import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Navbar from "./Navbar";

function AdminDashboard() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const adminLoggedIn =
      localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
      navigate("/admin");
      return;
    }

    const savedCustomers =
      JSON.parse(localStorage.getItem("queueCustomers")) || [];

    setCustomers(savedCustomers);
  }, [navigate]);

  const totalTokens = customers.length;

  // Completed and Skipped customers are not waiting
  const waiting = customers.filter(
    (customer) =>
      customer.status !== "Completed" &&
      customer.status !== "Skipped"
  ).length;

  const completed = customers.filter(
    (customer) => customer.status === "Completed"
  ).length;

  const skipped = customers.filter(
    (customer) => customer.status === "Skipped"
  ).length;

  // Find first waiting customer
  const waitingCustomers = customers.filter(
    (customer) =>
      customer.status !== "Completed" &&
      customer.status !== "Skipped"
  );

  const currentToken =
    waitingCustomers.length > 0
      ? waitingCustomers[0].token
      : 1;

  // Next Customer
  const handleNextCustomer = () => {
    if (waitingCustomers.length === 0) {
      alert("No customers in queue");
      return;
    }

    const nextCustomer = waitingCustomers[0];

    const updatedCustomers = customers.map(
      (customer) =>
        customer.token === nextCustomer.token
          ? { ...customer, status: "Completed" }
          : customer
    );

    const remainingWaiting = updatedCustomers.filter(
      (customer) =>
        customer.status !== "Completed" &&
        customer.status !== "Skipped"
    );

    if (remainingWaiting.length > 0) {
      localStorage.setItem(
        "currentToken",
        remainingWaiting[0].token
      );
    } else {
      localStorage.setItem("currentToken", 1);
    }

    localStorage.setItem(
      "queueCustomers",
      JSON.stringify(updatedCustomers)
    );

    setCustomers(updatedCustomers);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");

    navigate("/admin");
  };

  return (
    <>
      <Navbar />

      <div className="admin-dashboard">

        {/* Sidebar */}

        <aside className="admin-sidebar">

          <div className="admin-logo">
            👥 QueueLess
          </div>

          <div
            className="sidebar-item active"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            🏠 Dashboard
          </div>

          <div
            className="sidebar-item"
            onClick={() =>
              navigate("/queue-management")
            }
          >
            👥 Queue Management
          </div>

          <div className="sidebar-item">
            👤 Users
          </div>

          <div className="sidebar-item">
            ⚙️ Settings
          </div>

          <div
            className="sidebar-item logout"
            onClick={handleLogout}
          >
            🚪 Logout
          </div>

        </aside>


        {/* Main Content */}

        <main className="admin-main">

          {/* Top Bar */}

          <div className="admin-topbar">

            <div>
              <h1>Welcome, Admin!</h1>

              <p>
                Here's what's happening with your
                queue system today.
              </p>
            </div>

            <div className="admin-profile">
              👤 Admin
            </div>

          </div>


          {/* Statistics */}

          <div className="stats-container">

            <div className="stat-card">

              <span className="stat-icon">
                👥
              </span>

              <p>Total Tokens</p>

              <h2>{totalTokens}</h2>

            </div>


            <div className="stat-card">

              <span className="stat-icon">
                🕐
              </span>

              <p>Waiting</p>

              <h2>{waiting}</h2>

            </div>


            <div className="stat-card">

              <span className="stat-icon">
                ✓
              </span>

              <p>Completed</p>

              <h2>{completed}</h2>

            </div>


            <div className="stat-card">

              <span className="stat-icon">
                ✕
              </span>

              <p>Skipped</p>

              <h2>{skipped}</h2>

            </div>

          </div>


          {/* Dashboard Content */}

          <div className="dashboard-content">


            {/* Queue Management Card */}

            <div className="queue-card">

              <div className="card-header">

                <h2>Queue Management</h2>

                <button
                  onClick={() =>
                    navigate("/queue-management")
                  }
                >
                  View All →
                </button>

              </div>


              <table>

                <thead>

                  <tr>
                    <th>Token</th>
                    <th>Name</th>
                    <th>Service</th>
                    <th>Status</th>
                  </tr>

                </thead>


                <tbody>

                  {customers
                    .slice(0, 6)
                    .map((customer) => (

                      <tr key={customer.token}>

                        <td>
                          A-
                          {String(customer.token)
                            .padStart(3, "0")}
                        </td>

                        <td>
                          {customer.name}
                        </td>

                        <td>
                          {customer.service}
                        </td>

                        <td>

                          <span
                            className={
                              customer.status === "Completed"
                                ? "completed-status"
                                : customer.status === "Skipped"
                                ? "skipped-status"
                                : "waiting-status"
                            }
                          >
                            {customer.status || "Waiting"}
                          </span>

                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>


            {/* Current Token */}

            <div className="current-token-card">

              <h2>Current Token</h2>

              <div className="current-token">

                A-
                {String(currentToken)
                  .padStart(3, "0")}

              </div>

              <button
                onClick={handleNextCustomer}
              >
                Next Customer →
              </button>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default AdminDashboard;