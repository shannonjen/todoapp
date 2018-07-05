var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile.js')[environment];
const knex = require('knex')(knexConfig);

/* GET todos */
router.get('/', function(req, res, next) {
  knex('todos')
  .then(function(todos){
    res.send(todos);
  })
});

router.post('/', function(req, res, next){
  const {task} = req.body;
  console.log(req.body);
  knex('todos')
  .insert({task})
  .then(function(){
    res.redirect('/todos')
  })
})

module.exports = router;
