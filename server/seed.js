const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const client = new pg.Client("postgres://localhost/acme_hr_db");
const init = async (req, res) => {
  try {
    await client.connect();
    const SQL = `
          DROP TABLE IF EXISTS users;
          CREATE TABLE users(
              id SERIAL PRIMARY KEY,
              name VARCHAR(50),
              is_admin BOOLEAN DEFAULT FALSE
          );
          INSERT INTO users(name, is_admin) VALUES ('Nikhil', true);
          INSERT INTO users(name) VALUES ('Mikhil');
          INSERT INTO users(name) VALUES ('Sikhil');
      `;
    await client.query(SQL);
    console.log("seeded");
    await client.end();
  } catch (error) {
    console.error(error);
  }
};
init();
