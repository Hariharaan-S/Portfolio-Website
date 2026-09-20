import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import connectDB from "./config/database.js";
import router from "./routes/index.js";
import adminRouter from "./routes/admin.js";
import { notFoundPage } from "./controllers/pageController.js";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(session({
  secret: process.env.SESSION_SECRET || "development-only-session-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 8,
  },
}));
app.use(express.static("public"));
app.use("/services", express.static("public"));
app.use("/projects", express.static("public"));

app.use(router);
app.use("/admin", adminRouter);
app.use(notFoundPage);

const port = process.env.PORT || 5000;

connectDB().catch((error) => {
  console.error("Database connection failed:", error);
});

app.listen(port, () => {
  console.log("Server is running at port " + port);
});
