import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './dbconnection.js';
import cors from 'cors';
import router from './view/route.js';

const app = express();

// Middleware parse JSON
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/api', router);

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));