const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const api = require('./routes');

const app = express();
const port = 8080;

const frontendBuildFolder = './../../every-tutorials-frontend/build';

app.use(morgan('dev'));
app.use(bodyParser.json());

//mongodb setting
const db = require('./db');
db();

//session setting
app.use(session({
    key: 'every-tutorials-cookie',
    secret: 'SECRET-KEY',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

//middleware setting
app.use('/', express.static(__dirname + frontendBuildFolder));
app.use('/', api);
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//server open
app.listen(port, () => {
    console.log('Express is listening on port', port);
});
