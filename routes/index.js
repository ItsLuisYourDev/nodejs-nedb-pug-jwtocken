var express = require('express');
var router = express.Router();
const db = require('../database/db')

// /* GET home page. */
// Definir una ruta de ejemplo que renderiza una vista Pug
router.get('/', (req, res) => {
  db.find({},(err,users)=>{
    if(err){
      console.log('error in load data')
    }else{
      console.log(users)
      res.render('index', { title: 'Ejemplo con Pug', items: users });
    }
  })
});

module.exports = router;