import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDatabase from "./src/db/db.js";

// connecting to the database
connectToDatabase();

// starting the server
app.listen(3000, "0.0.0.0", () => {
  console.log("server is running on port 3000");
});