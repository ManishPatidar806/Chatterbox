import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import app from "./app.js";
import connection from "./db";
const port = 8000;

connection()
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(`Server is Listening At ${port}`);
    });
  })
  .catch((error) => {
    console.log(`DB Connection Failed ${error.message}`);
  });
