var express = require('express');
var router = express.Router();

const db = require('../database/db')

// /* GET home page. */
// Definir una ruta de ejemplo que renderiza una vista Pug
// view to home 
router.get('/', (req, res) => {
  db.users.find({}, (err, users) => {
    if (err) {
      console.log('error in load data')
    } else {
      console.log(users)
      res.render('index', { title: 'Ejemplo con Pug', items: users });
    }
  })
});

// view to chats
router.get('/chats', (req, res) => {
  db.chats.find({}, (err, datos) => {
    if (err) {
      console.log("error")

    } else {
      res.render("chats/index",
        {
          pageTitle: "task",
          data: datos
        })
    }
  })
  // res.render("../view/task/index.ejs",
  //     { pageTitle: "task" })
})

module.exports = router;