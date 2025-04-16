// imports here for express and pg
const express = require("express");
const app = express();
const pg = require("pg");
const PORT = 3000;
const client = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
//--> const cors = require("cors");
// static routes here (you only need these for deployment)

// app routes here
//--> app.use(cors());
app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/api/employees", (req, res) => {
  res.send("Get Employees.");
});
// create your init function
const init = async (req, res) => {
  try {
    await client.connect();
    const SQL = `
        DROP TABLE IF EXISTS users;
        CREATE TABLE users(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(100),
            is_admin BOOLEAN DEFAULT FALSE
        );
    `;
    await client.query(SQL);
    await client.end();
  } catch (error) {
    console.error(error);
  }
};
// init function invocation
init();
