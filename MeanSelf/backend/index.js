const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db.js');
const prodRoutes = require('./routes/product');

var app = express();
app.use(bodyParser.json());
app.listen(3000, () => console.log('server started at 3000 port !!!'));


const http = require('http');

var cors = require('cors')
app.use(cors({origin:'http://localhost:4200'}))

app.use((rq, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST,GET,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
})

app.use('/api', prodRoutes)
