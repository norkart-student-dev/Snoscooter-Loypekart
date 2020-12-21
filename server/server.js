const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const cookieSession = require('cookie-session')
const fs = require('fs');
const Keygrip = require('keygrip')
const app = express();
var dbString = null;
var cookieSecure = null;
var port = null;

try {
  let configString = fs.readFileSync('config.txt', 'utf8');
  configString = configString.split('\n');
  
  configString.forEach(configParam => {
    let configVal = configParam.substring(configParam.indexOf(':') + 2, configParam.length - 1);
    if (configParam.startsWith('port')) {
      port = parseInt(configVal);
    }
    else if (configParam.startsWith('db')) {
      dbString = configVal;
    }

    else if (configParam.startsWith('cookieSecure')) {
      if (configVal === 'false') {
        cookieSecure = false;
      } else {
        cookieSecure = true;
      }
    }
  });
}
catch(err) {
  console.log("An error occured while reading config file:\n" + err);
}

port = process.env.PORT || port;
const DATABASE_URL = process.env.MONGODB_URI || dbString;
console.log("Final set database url : " + DATABASE_URL);

app.disable('x-powered-by');
app.use(cookieSession({
  name : 'scooterLoypeSession',
  secure : false,
  secret : Math.random().toString(),
  maxAge : 24 * 60 * 60 * 1000
}))

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const poiRouter = require('./routes/poiRoute')
app.use('/poi', poiRouter)

const LoginRouter = require('./routes/loginRoute');
app.use('/loginRoute', LoginRouter);

const trackRouter = require('./routes/wfsRoute');
const { log } = require('console');
const { type } = require('os');
app.use('/tracks', trackRouter)

app.listen(port, () => console.log(`Listening on port ${port}`));

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }