import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetToken.css";

function GetToken() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("");

  const [token, setToken] = useState(
    Number(localStorage.getItem("lastToken")) || 1
  );

  const [currentToken, setCurrentToken] = useState(1);
  const [peopleAhead, setPeopleAhead] = useState(0);

  // Queue details load pannum
  useEffect(() => {
    const savedCustomers =
      JSON.parse(localStorage.getItem("queueCustomers")) || [];

    const waitingCustomers = savedCustomers.filter(
      (customer) =>
        customer.status !== "Completed" &&
        customer.status !== "Skipped"
    );

    if (waitingCustomers.length > 0) {
      setCurrentToken(waitingCustomers[0].token);
    } else {
      setCurrentToken(1);
    }

    setPeopleAhead(waitingCustomers.length);
  }, []);

  const handleGetToken = () => {
    if (name === "" || mobile === "" || service === "") {
      alert("Please fill all details");
      return;
    }

    const newCustomer = {
      token: token,
      name: name,
      mobile: mobile,
      service: service,
      status: "Waiting"
    };

    const existingCustomers =
      JSON.parse(localStorage.getItem("queueCustomers")) || [];

    // New customer queue-la add pannum
    const updatedCustomers = [
      ...existingCustomers,
      newCustomer
    ];

    // Waiting customers mattum
    const waitingCustomers = updatedCustomers.filter(
      (customer) =>
        customer.status !== "Completed" &&
        customer.status !== "Skipped"
    );

    // First waiting customer dhaan current token
    const nextCurrentToken =
      waitingCustomers.length > 0
        ? waitingCustomers[0].token
        : 1;

    // New customer-ku munnaadi irukkura people
    const waitingBeforeThisCustomer =
      waitingCustomers.filter(
        (customer) => customer.token < token
      ).length;

    // Save queue
    localStorage.setItem(
      "queueCustomers",
      JSON.stringify(updatedCustomers)
    );

    // Save current queue token
    localStorage.setItem(
      "currentToken",
      nextCurrentToken
    );

    // Current customer's details
    localStorage.setItem(
      "customerName",
      name
    );

    localStorage.setItem(
      "customerToken",
      token
    );

    localStorage.setItem(
      "service",
      service
    );

    localStorage.setItem(
      "peopleAhead",
      waitingBeforeThisCustomer
    );

    // Next token
    localStorage.setItem(
      "lastToken",
      token + 1
    );

    setToken(token + 1);

    navigate("/liveQueue");
  };

  return (
    <div className="get-token-page">

      <h1>Get Your Token</h1>

      <p className="subtitle">
        Fill in your details and get your token
      </p>

      <div className="token-form">

        <label>Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <label>Mobile Number</label>

        <input
          type="text"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(event) =>
            setMobile(event.target.value)
          }
        />

        <label>Select Service</label>

        <select
          value={service}
          onChange={(event) =>
            setService(event.target.value)
          }
        >
          <option value="">
            Select a service
          </option>

          <option value="General">
            General
          </option>

          <option value="Payment">
            Payment
          </option>

          <option value="Consultation">
            Consultation
          </option>

          <option value="Enquiry">
            Enquiry
          </option>
        </select>

        <button onClick={handleGetToken}>
          Get Token
        </button>

      </div>

      <div className="token-card">

        <p>Your Token</p>

        <h2>
          A-{String(token).padStart(3, "0")}
        </h2>

        <div className="token-info">

          <div>
            <span>Current Token</span>

            <b>
              A-{String(currentToken).padStart(3, "0")}
            </b>
          </div>

          <div>
            <span>People Ahead</span>

            <b>{peopleAhead}</b>
          </div>

        </div>

        <p className="wait-time">
          🕐 Estimated Wait Time:
          <b>{peopleAhead * 5} mins</b>
        </p>

      </div>

    </div>
  );
}

export default GetToken;