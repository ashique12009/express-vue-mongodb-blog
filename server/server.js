import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './dbconnection.js';
import cors from 'cors';

const app = express();
// Middleware parse JSON
app.use(express.json());
app.use(cors({ origin: '*' }));

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));