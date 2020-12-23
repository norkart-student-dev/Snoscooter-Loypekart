const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const cookieSession = require('cookie-session')
const app = express();
const port = process.env.PORT || 5000;
const DATABASE_URL= process.env.MONGODB_URI || "mongodb+srv://bjosor:loypekart@cluster0.kyhik.mongodb.net/loypekartdata?retryWrites=true&w=majority";

app.disable('x-powered-by');

app.use(cookieSession({
  name : 'session1',
  secure : false,
  keys: ["key1", "key2"],
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