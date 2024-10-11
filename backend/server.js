import dotenv from "dotenv";
import express from 'express';
import { connectDB } from './config/db.js'; // MongoDB import

import cardRoutes from "./routes/card.route.js";

dotenv.config(); // // allows us to use the .env file

const app = express();
const PORT = process.env.PORT || 5000; // This allows us to use mongo passkey and PORT variable in .env file

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/cards", cardRoutes)

app.listen(PORT, () => { // Server PORT
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});