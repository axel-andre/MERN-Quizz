
// Import d'ExpressJS
const express = require("express");
const slug = require('slug')
const mongoose = require('mongoose');

mongoose.connect('mongodb://bdd:27017/quizzes', { useNewUrlParser: true });
const quizzesSchema = new mongoose.Schema({
  name: String,
  keywords: Array,
  icon: String,
  questions: Array,
  published: Boolean,
  ownerId: Number,
  scores: Array,
  slug: String
});

const QuizzModel = mongoose.model('quizzes', quizzesSchema)
const bodyParser = require("body-parser");
const router = express.Router();


// let sluggedQuizz = quizz.quizzes;
// sluggedQuizz.slug = slug(sluggedQuizz.name,{lower:true});

// Import des informations pour la base de données
const db = require('./db/mongoose.js');

const Users = db.users;


router
  .use(express.static('resources'))
  .use(bodyParser.json()) // for parsing application/json
  .use(bodyParser.urlencoded({
    extended: true
  })) // for parsing application/x-www-form-urlencoded
  .get("/users", (req, res) => {
    res.status(200);
    res.json(testUsers)
  })
  .get('/about',(req,res)=>{
  })

  .get("/quizzes", (req, res) => {
    QuizzModel
    .find({
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json('Error ! :' + err);
    })

  })
  .get('/remove-all',(req,res)=>{
    QuizzModel
    .remove({
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json('Error ! :' + err);
    })
  })
  .get("/quizz/:id", (req, res) => {

    QuizzModel
    .find({
      slug: req.params.id   // search query
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json('Error ! :' + err);
    })
    
  })
  .post("/add-quizz", (req,res)=>{
    let quizz = req.body;
    quizz.slug = slug(quizz.name,{lower:true});
    let newQuizz = new QuizzModel(quizz);
    newQuizz.save()
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json('error : '+ err)
    })
    res.json(quizz);
  })

  
  .use((req, res) => {
    res.status(400);
    res.json({
      error: "Bad request"
    });
  });


module.exports = router;
