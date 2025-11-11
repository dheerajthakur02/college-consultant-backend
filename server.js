import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import stateRoutes from "./routes/state.routes.js";
import districtRoutes from "./routes/district.routes.js";
import streamRoutes from "./routes/stream.routes.js";
import collegeRoutes from "./routes/college.routes.js";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/district", districtRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/college", collegeRoutes);

app.get("/", (req, res) => {
  res.send("Sever is running");
});
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
