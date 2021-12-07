const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/**
* @author Abhijeet Rathore
**/

//routes
const authRoutes = require('./Routes/auth');

//mongodb connection

mongoose.connect(`mongodb+srv://admin:pWHZWLl9pmeA4nr3@cluster0.xuvv0.mongodb.net/task1?retryWrites=true&w=majority`,   
).then(() => {
    console.log('Database Connected');
});

//environment variable or constants
env.config();

// Middileware
app.use(bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api',authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});