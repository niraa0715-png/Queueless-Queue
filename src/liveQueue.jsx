import { useEffect, useState } from "react";
import "./LiveQueue.css";

function LiveQueue() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadQueue = () => {
      const savedCustomers =
        JSON.parse(localStorage.getItem("queueCustomers")) || [];

      setCustomers(savedCustomers);
    };

    loadQueue();

    // Update when localStorage changes
    window.addEventListener("storage", loadQueue);

    return () => {
      window.removeEventListener("storage", loadQueue);
    };
  }, []);

  // Only waiting customers
  const waitingCustomers = customers.filter(
    (customer) =>
      customer.status !== "Completed" &&
      customer.status !== "Skipped"
  );

  // Current token = first waiting customer
  const currentToken =
    waitingCustomers.length > 0
      ? waitingCustomers[0].token
      : 1;

  // Get current user's name
  const customerName =
    localStorage.getItem("customerName");

  // Find current user's token
  const yourCustomer = customers.find(
    (customer) =>
      customer.name === customerName
  );

  const yourToken = yourCustomer
    ? yourCustomer.token
    : 1;

  // Find user's position in waiting queue
  const yourIndex = waitingCustomers.findIndex(
    (customer) =>
      customer.token === yourToken
  );

  const peopleAhead =
    yourIndex >= 0
      ? yourIndex
      : 0;

  return (
    <div className="live-queue-page">

      <h1>Live Queue</h1>

      <p className="queue-subtitle">
        Current queue status
      </p>

      {/* Now Serving */}

      <div className="serving-card">

        <p>Now Serving</p>

        <h2>
          A-{String(currentToken).padStart(3, "0")}
        </h2>

      </div>


      {/* Your Token */}

      <div className="your-token-card">

        <div className="token-details">

          <div>
            <span>Your Token</span>

            <h2>
              A-{String(yourToken).padStart(3, "0")}
            </h2>
          </div>

          <div className="divider"></div>

          <div>
            <span>People Ahead</span>

            <h2>{peopleAhead}</h2>
          </div>

        </div>

        <div className="wait-time">
          🕐 Estimated Wait Time:
          <b>{peopleAhead * 5} mins</b>
        </div>

      </div>


      {/* Queue List */}

      <div className="queue-list">

        <h3>Queue List</h3>

        {waitingCustomers.map((customer) => (

          <div
            className={
              customer.token === yourToken
                ? "queue-row your-row"
                : "queue-row"
            }
            key={customer.token}
          >

            <div className="queue-token">
              👤

              <b>
                A-
                {String(customer.token)
                  .padStart(3, "0")}
              </b>
            </div>

            <span>
              {customer.token === yourToken
                ? "You"
                : "Waiting"}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default LiveQueue;