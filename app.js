const express = require('express');
const app = express();
require('dotenv').config();
// Importing Router
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// Connection importing
const connectDB = require('./db/connect');

// Middleware importing
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const authenticationMiddleware = require('./middleware/auth');

// Extra security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// rate limiter
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, //limit each IP to 100 per windowMs
    })
);

// MIddleware to access Json BODY
app.use(express.json());

// Extra security
app.use(helmet());
app.use(cors());
app.use(xss());

// Rendering
app.get("/", (req, res) => {
    res.send("JobsAPI");
})

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRouter);

// Using middlewares
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// Initiating server
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log("Server started listening on http://localhost:5000/"));
    } catch (error) {
        console.log(error);
    }
}

// Running server
start();