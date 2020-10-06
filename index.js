const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.egr2g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);
const app = express()
app.use(bodyParser.json());
app.use(cors());

const port = 5000
app.get('/', (req, res) => {
  res.send('hello world')
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

  const volunteerCollection = client.db("volunteerWork").collection("volunteer");
  const volunteerRegistration = client.db("volunteerWork").collection("registration");
  console.log('database connected');
  // app.post('/addDetails',(req, res)=> {
  //     const name = req.body;
  //     console.log(name);
  //     volunteerCollection.insertMany(name)
  //     .then(result => {
  //         console.log(result);
  //         res.send(result)
  //     })
  //     .catch(err => console.log(err))
  // })

  app.post('/shabnam', (req, res) => {
    const registrationsDetails = req.body;
    volunteerRegistration.insertOne(registrationsDetails)
      .then(result => {
        console.log(result.insertedCount);
        res.send(result)
      })
  })
  //this is to read the details

  app.get('/registration', (req, res) => {
    volunteerRegistration.find({ email: req.query.email })
      .toArray((err, result) => {
        res.send(result)
      })

  })
  //this get is for all data get 
  app.get('/call', (req, res) => {
    volunteerCollection.find({})
      .toArray((err, result) => {
        res.send(result)
      })

  })
  //single data load
  app.get('/registration/:id', (req, res) => {
    volunteerCollection.find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0])
      })
  })
  //all the user activity info 
  app.get("/every", (req, res) => {
    volunteerRegistration.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  //this is for delete 
  app.delete('/deleteUser/:id', (req, res) => {
    volunteerRegistration.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        console.log(result.deletedCount);
        res.send(result);
      })
  })
});











app.listen(port)