const express = require('express')


const dotenv = require('dotenv')

// require('dotenv').config()
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working

const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv')

// npm i body-parser
const bodyparser = require('body-parser')

//npm install cors
const cors = require('cors')

dotenv.config()

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

const app = express()

const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

//API for find
//get all the passwords
app.get('/',async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//API for insertion
// save a passwords
app.post('/',async (req, res) => {
    
    const password = req.body

    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({sucess:true, result:findResult})
})

//delete a password
app.delete('/',async (req, res) => {
    
    const password = req.body

    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({sucess:true, result:findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})