import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import "dotenv/config";
import { errorHandler } from "./middleware/errorsMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const PORT = process.env.PORT;
const server = express();

connectDB();

server.use(
  cors({
    origin: "process.env.CLIENT_URL",
    credentials:true
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api/users", userRoutes);
server.use("/api/questions", questionRoutes);
server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
