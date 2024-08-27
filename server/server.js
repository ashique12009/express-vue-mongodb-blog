import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './dbconnection.js';
import cors from 'cors';
import router from './view/route.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

// Middleware parse JSON
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true, exposedHeaders: ['set-cookie'] }));

dotenv.config();
connectDB();

// Cookie Parser
app.use(cookieParser());
app.use(bodyParser.json());

// Session Configuration
app.use(session({
    secret: 'session-secret', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        sameSite: 'lax'
    }
}));

app.use('/api', router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));