import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");
        setEmployees(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (isLoading) {
    return <section className="loading">Loading...</section>;
  }

  return (
    <main>
      <h1>Acme HR ({employees.length})</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name}
            {employee.is_admin ? (
              <span style={{ paddingLeft: "1rem", color: "red" }}>
                (Administrator)
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
};

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
