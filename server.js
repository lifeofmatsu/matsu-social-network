const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const users = require('./routes/userRoutes');
const thoughts = require('./routes/thoughtRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', users);
app.use('/', thoughts);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
