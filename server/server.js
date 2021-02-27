const express = require('express')
const path = require('path');
const cookieSession = require('cookie-session')
const fs = require('fs');
const Keygrip = require('keygrip')
const app = express();
const serverConfig = require('./config/server.config.js')
const dbConfig = require('./config/db.config.js') 
var cookieSecure = serverConfig.cookieSecure;
var port = process.env.PORT || serverConfig.PORT;
var cookieSessionName = serverConfig.cookieSessionName;

const DATABASE_URL = serverConfig.DB;

app.disable('x-powered-by');
app.use(cookieSession({
  name : cookieSessionName,
  secure : cookieSecure,
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
app.use('/tracks', trackRouter.router)


const { default: Axios } = require('axios');

let db;
async function loadTrackData(db, router) {
  db = await require("./models");
  await db.sequelize.sync()
  router.loadTracks();
}

const mysql = require('mysql2/promise');
mysql.createConnection({
    user     : dbConfig.USER,
    password : dbConfig.PASSWORD
}).then((connection) => {
    console.log('connection established')
    connection.query('CREATE DATABASE IF NOT EXISTS ' + dbConfig.DB).then(() => {
        // Safe to use sequelize now
        console.log('Database created!')
        loadTrackData(db, trackRouter)
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));

//load database connection


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }