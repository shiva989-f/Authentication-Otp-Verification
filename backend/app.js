import express  from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import { DBConnection } from "./Connection/DBConnection.js";
import authRoute from './Routers/AuthRouter.js';
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
DBConnection();

app.use(express.json()) // allows us to parse incoming request: req.body
app.use(cookieParser()) // allows us to parse incoming cookie: req.cookie
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true})); // credentials allows to send cookies

app.use('/api/auth', authRoute)

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT} `);
});