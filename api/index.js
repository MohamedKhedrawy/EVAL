import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import "dotenv/config";
import { errorHandler } from "./middleware/errorsMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import serverless from "serverless-http"; // Needed for Vercel/Netlify


// const PORT = process.env.PORT;dsdssd
const server = express();

connectDB();

server.use(
  cors({
    origin: "https://eval-vercel-7acjc9zl4-mohamed-khedrawys-projects.vercel.app",
    credentials:true
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api/users", userRoutes);
server.use("/api/questions", questionRoutes);
server.use(errorHandler);

// server.listen(PORT, () => {
//   console.log(`server started on port ${PORT}`);
// });

// Export as a serverless function
export const handler = serverless(server);
