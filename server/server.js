

const express = require('express')
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 5000;
const DATABASE_URL='mongodb://localhost/subscribers'


mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())


const poiRouter = require('./routes/poiRoute');
app.use('/poi', poiRouter);

const QMSRouter = require('./routes/QMSRoute');
app.use('/qms', QMSRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));

