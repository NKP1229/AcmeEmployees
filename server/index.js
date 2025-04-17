// imports here for express and pg
const express = require("express");
const app = express();
const pg = require("pg");
const PORT = 3000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const client = new pg.Client("postgres://localhost/FirstDB");

// static routes here (you only need these for deployment)

// app routes here
app.use(cors());
app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/api/employees", async (req, res, next) => {
  try {
    const SQL = `
        SELECT * from users;
    `;
    const response = await client.query(SQL);
    res.status(200).send(response.rows);
    // res.send("Get Employees.");
  } catch (error) {
    // res.status(400).send("Something didn't work");
    next(error);
  }
});
// create your init function
const init = async (req, res) => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
};
// init function invocation
init();
