const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const fileRoutes = require('./api/routes/files');
const contributorRoutes = require('./api/routes/contributors');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017');
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/files', fileRoutes);
app.use('/contributors', contributorRoutes);

app.use((req, res, next) => {
    const error = new Error('Resource not found!');
    error.status=404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
