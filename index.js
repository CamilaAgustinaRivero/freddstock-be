const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// Public
app.use(express.static('public'));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
});