const express = require('express')
const path = require('path');
const cookieSession = require('cookie-session')
const fs = require('fs');
const Keygrip = require('keygrip')
const app = express();
var dbString = null;
var cookieSecure = null;
var port = null;
var cookieSessionName = null;

function parseConfig(configFile) {
  let configString = fs.readFileSync(configFile, 'utf8');
  configString = configString.replace(/\r/g, ''); ////fix for OSes using '\r\n' as newline in files
  configString = configString.split('\n');
  let configVals = {};
  configString.forEach(s => {
    if (!s.startsWith('//') && s !== '') {
      let param = s.substring(0, s.indexOf(':')).trim();
      let val = s.substring(s.indexOf(':') + 1, s.length).trim();
      if (param.startsWith('port')) {
        configVals['port'] = parseInt(val)
      } 
      else if (param.startsWith('db')) {
        configVals['db'] = val;
      }
      else if (param.startsWith('cookieSecure')) {
        if (val === 'false') {
          configVals['cookieSecure'] = false;
        } else {
          configVals['cookieSecure'] = true;
        }
      }
      else if (param.startsWith('cookieSession')) {
        configVals['cookieSession'] = val;
      }
    }
  })
  return configVals;

}

try {
    let configVals = parseConfig('config.txt');
    port = configVals.port;
    dbString = configVals.db;
    cookieSecure = configVals.cookieSecure;
    cookieSessionName = configVals.cookieSession;
}
catch(err) {
  console.log("An error occured while reading config file:\n" + err);
  console.log("Default to standard values: port=5000, database=mongodb://localhost/scooterLoypeDB, cookiesecure=true, cookieSessionName=scooterLoypeSession");
  port = 5000;
  cookieSecure = true;
  cookieSessionName = "scooterLoypeSession";
  dbString = "mongodb://localhost/scooterLoypeDB";
}


port = process.env.PORT || port;
const DATABASE_URL = process.env.MONGODB_URI || dbString;

app.disable('x-powered-by');
app.use(cookieSession({
  name : cookieSessionName,
  secure : false,
  secret : Math.random().toString(),
  maxAge : 24 * 60 * 60 * 1000
}))


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

const mysql = require('mysql2/promise');

mysql.createConnection({
    user     : 'root',
    password : '1234'
}).then((connection) => {
    console.log('connection established')
    connection.query('CREATE DATABASE IF NOT EXISTS testdb;').then(() => {
        // Safe to use sequelize now
        console.log('Database created!')
    })
})



//load database connection
const db = require("./models");
db.sequelize.sync();

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }