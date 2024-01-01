const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// custom imports
const { connect } = require('./utils/database');
const userRouter = require('./router/userRouter');
const contactRouter = require('./router/contactRouter');

const app = express();

// hidden data in .env file
require('dotenv').config();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// all custom middlewares
// user routes
app.use("/api/auth", userRouter);

// contact routes
app.use("/api/contact", contactRouter);

// render
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'frontend', 'dist', 'index.html'));
})

// error final route
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
    });
});

// 
app.listen(port, async () => {
    await connect();

    console.log(`Server is running on port ${port}`);
});