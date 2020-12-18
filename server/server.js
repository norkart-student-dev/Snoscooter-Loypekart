const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const cookieSession = require('cookie-session')
const fs = require('fs');
const Keygrip = require('keygrip')
const app = express();
var dbString = null;
var sessionName = null;
var cookieSecure = null;


try {
  let configString = fs.readFileSync('config.txt', 'utf8');
  configString = configString.split('\n');
  configString.forEach(element => {
    if (element.startsWith('db')) {
      dbString = element.substring(element.indexOf(':') + 1, element.length - 1)
    }
    else if (element.startsWith('cookieSession')) {
      sessionName = element.substring(element.indexOf(':') + 1, element.length - 1)
      if(sessionName === " " || sessionName === "") {
        sessionName = "scooterLoypeSession";
        console.log("No session name provided, defaulting to \"scooterLoypeSession\"");
      }
    }
    else if (element.startsWith('cookieSecure')) {
      cookieSecure = element.substring(element.indexOf(':') + 1, element.length - 1)
      if (cookieSecure === 'false') cookieSecure = false;
      else cookieSecure = true;
    }
  });
}
catch(err) {
  console.log(err);
}

const port = process.env.PORT || 5000;
const DATABASE_URL = process.env.MONGODB_URI || dbString

app.disable('x-powered-by');
app.use(cookieSession({
  name : sessionName,
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
app.use('/qms', LoginRouter);

const trackRouter = require('./routes/wfsRoute')
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