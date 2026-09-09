import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/database.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/services", express.static("public"));
app.use("/projects", express.static("public"));

app.use(router);

const port = process.env.PORT || 5000;

connectDB().catch((error) => {
  console.error("Database connection failed:", error);
});

app.listen(port, () => {
  console.log("Server is running at port " + port);
});
