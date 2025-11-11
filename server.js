import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import stateRoutes from "./routes/state.routes.js";
import districtRoutes from "./routes/district.routes.js";
import streamRoutes from "./routes/stream.routes.js";
import collegeRoutes from "./routes/college.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import coursesRoutes from "./routes/courses.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/district", districtRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/college", collegeRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/course", coursesRoutes);

app.get("/", (req, res) => {
  res.send("Sever is running");
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
