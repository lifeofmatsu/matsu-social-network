const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});