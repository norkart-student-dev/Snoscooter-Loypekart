const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const apiGateway = require('./ApiGateway');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

//set limit for accepted filesize
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

//intercept all outgoing requests for logging purposes
axios.interceptors.request.use(function (config) {
  console.log(config)
  return config;
}, function (error) {
  return Promise.reject(error);
});

const nvdb = new apiGateway("https://nvdbapiles-v3.atlas.vegvesen.no/")
let token;
let tokenName;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/getroadobjecttypes', (req, res) => {
    nvdb.apiCallSingle(req.body.request).then(data => {res.send(data)}).catch(e => {console.log(e)})

});

app.post('/api/getroadobjects', (req, res) => {
  nvdb.apiCall(req.body.request).then(data => {res.send(data)}).catch(e => {console.log(e)})

});

app.post('/registerCase', (req, res) => {
  const fs = require("fs"); 
  const cases = require("./data.json"); 

  console.log(req.body)
  if(req.body.id !== undefined){
    let index = cases.findIndex(curCase =>(curCase.id === req.body.id));
    cases[index] = req.body;
  } else {
    let ids = [];
    let id = cases.length;
    cases.forEach(element => {
      ids.push(element.id)
    });
    while (ids.includes(id)) {
      id += 1
    }
  
    req.body['id'] = id;
    cases.push(req.body); 
  }


  // STEP 3: Writing to a file 
  fs.writeFile("data.json", JSON.stringify(cases), err => { 
     
    // Checking for errors 
    if (err) throw err;  
   
    console.log("Done writing"); // Success 
  }); 

  res.send('success')
});

app.get('/getCaseList', (req,res) => {
  const cases = require('./data.json')

  res.send(cases)
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
