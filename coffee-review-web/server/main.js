import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import api from './routes';
import mongoose from 'mongoose';
import dataManager from './data/dataManager';

const app = express();
const ip = 'localhost';
let port = 8080;
let devPort = 4000;
if(process.env.NODE_ENV == 'development') {
    port = 3000;
}

app.use(morgan('dev'));
app.use(bodyParser.json());

//mongodb setting
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost/CoffeeReview');

//session setting
app.use(session({
    secret: 'SECRET-KEY',
    resave: false,
    saveUninitialized: true
}));

//middleware setting
app.use('/', express.static(path.join(__dirname, './../public')));
app.use('/', api);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


//running env setting
if(process.env.NODE_ENV == 'development') {
	app.listen(port, () => {
	    console.log('Express is listening on port', port);
	});
} else {
	app.listen(port, ip);
}

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}

let DM = new dataManager();
DM.readDataFromJson();
