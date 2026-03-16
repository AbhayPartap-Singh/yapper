const express = require('express');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = require('./config/database');

connectDB();

module.exports = app;