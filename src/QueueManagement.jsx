import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./QueueManagement.css";

function QueueManagement() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
      navigate("/admin");
      return;
    }

    const savedCustomers =
      JSON.parse(localStorage.getItem("queueCustomers")) || [];

    setCustomers(savedCustomers);
  }, [navigate]);

  const updateCustomers = (updatedCustomers) => {
    localStorage.setItem(
      "queueCustomers",
      JSON.stringify(updatedCustomers)
    );

    setCustomers(updatedCustomers);
  };

  const updateCurrentToken = (updatedCustomers) => {
    const waitingCustomers = updatedCustomers.filter(
      (customer) =>
        customer.status !== "Completed" &&
        customer.status !== "Skipped"
    );

    if (waitingCustomers.length > 0) {
      localStorage.setItem(
        "currentToken",
        waitingCustomers[0].token
      );
    } else {
      // Queue completely empty
      localStorage.setItem("currentToken", 1);
      localStorage.setItem("lastToken", 1);
    }
  };

  const completeCustomer = (token) => {
    const updatedCustomers = customers.map((customer) =>
      customer.token === token
        ? { ...customer, status: "Completed" }
        : customer
    );

    updateCustomers(updatedCustomers);
    updateCurrentToken(updatedCustomers);
  };

  const skipCustomer = (token) => {
    const updatedCustomers = customers.map((customer) =>
      customer.token === token
        ? { ...customer, status: "Skipped" }
        : customer
    );

    updateCustomers(updatedCustomers);
    updateCurrentToken(updatedCustomers);
  };

  const removeCustomer = (token) => {
    const updatedCustomers = customers.filter(
      (customer) => customer.token !== token
    );

    updateCustomers(updatedCustomers);
    updateCurrentToken(updatedCustomers);
  };

  return (
    <>
      <Navbar />

      <div className="queue-management-page">

        <div className="queue-management-header">

          <div>
            <h1>Queue Management</h1>

            <p>
              Manage customers and control the queue.
            </p>
          </div>

          <button
            className="back-button"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            ← Dashboard
          </button>

        </div>

        <div className="queue-management-card">

          <table>

            <thead>
              <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Service</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {customers.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="no-customers"
                  >
                    No customers in queue
                  </td>
                </tr>

              ) : (

                customers.map((customer) => (

                  <tr key={customer.token}>

                    <td>
                      A-
                      {String(customer.token).padStart(
                        3,
                        "0"
                      )}
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
                            ? "status completed"
                            : customer.status === "Skipped"
                            ? "status skipped"
                            : "status waiting"
                        }
                      >
                        {customer.status || "Waiting"}
                      </span>

                    </td>

                    <td className="action-buttons">

                      <button
                        className="complete-button"
                        onClick={() =>
                          completeCustomer(
                            customer.token
                          )
                        }
                        disabled={
                          customer.status ===
                            "Completed" ||
                          customer.status ===
                            "Skipped"
                        }
                      >
                        Complete
                      </button>

                      <button
                        className="skip-button"
                        onClick={() =>
                          skipCustomer(
                            customer.token
                          )
                        }
                        disabled={
                          customer.status ===
                            "Completed" ||
                          customer.status ===
                            "Skipped"
                        }
                      >
                        Skip
                      </button>

                      <button
                        className="remove-button"
                        onClick={() =>
                          removeCustomer(
                            customer.token
                          )
                        }
                      >
                        Remove
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default QueueManagement;