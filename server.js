const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const users = require('./routes/userRoutes');
const thoughts = require('./routes/thoughtRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/', users);
app.use('/', thoughts);

mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});