import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import apiRouter from "./routes/index";
import { startCalendarCron } from "./config/corn";

dotenv.config();

const app = express();


app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

  startCalendarCron();



app.use(`/${process.env.CONTEXT_PATH}`, apiRouter);


const PORT = parseInt(process.env.PORT || "5000", 10);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
