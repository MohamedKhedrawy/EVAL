import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import 'dotenv/config';
import { errorHandler } from './middleware/errorsMiddleware.js';
import userRoutes from './routes/userRoutes.js'

const PORT = process.env.PORT;
const server = express();

connectDB();

server.use(cors({
    origin: "http://localhost:4000",
    // credentials:true
}))

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use("/api/users", userRoutes)
server.use(errorHandler)

server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})
