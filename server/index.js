// imports here for express and pg
const express = require("express");
const app = express();
const pg = require("pg");
const PORT = 3000;
const client = new pg.Client("postgres://localhost/nickeolla");
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
  } catch (error) {
    console.error(error);
  }
};
// init function invocation
init();
