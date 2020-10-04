const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.egr2g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


console.log(process.env.DB_USER,process.env.DB_PASSWORD, process.env.DB_NAME );
const app = express()
app.use(bodyParser.json());
app.use(cors());

const port = 5000




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    
  const volunteerCollection = client.db("volunteerWork").collection("volunteer");
  console.log('database connected');
  app.post('/addDetails',(req, res)=> {
      const name = req.body;
      console.log(name);
      volunteerCollection.insertMany(name)
      .then(result => {
          console.log(result);
          res.send(result)
      })
      .catch(err => console.log(err))
  })

//this is to read the details
app.get('/details',(req, res) =>{

} )

});









app.listen(port)
