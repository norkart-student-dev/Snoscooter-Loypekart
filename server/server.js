const express = require('express')
const mongoose = require('mongoose')
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const DATABASE_URL= process.env.MONGODB_URI || "mongodb+srv://bjosor:loypekart@cluster0.kyhik.mongodb.net/loypekartdb?retryWrites=true&w=majority";


mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const poiRouter = require('./routes/poiRoute')
app.use('/poi', poiRouter)

const QMSRouter = require('./routes/QMSRoute');
app.use('/qms', QMSRouter);

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