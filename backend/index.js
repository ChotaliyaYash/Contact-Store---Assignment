const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// custom imports
const { connect } = require('./utils/database');

const app = express();

// hidden data in .env file
require('dotenv').config();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// 
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 
app.listen(port, async () => {
    await connect();

    console.log(`Server is running on port ${port}`);
});