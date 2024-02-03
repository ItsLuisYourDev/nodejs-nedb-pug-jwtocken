const express = require('express')
const app = express()
app.set('port',"3000")

//? Configuración para utilizar Pug como motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views'); // Ruta donde se encuentran los archivos de vista Pug
// app.use(express.urlencoded({extended:false}))

//? Indicar a Express que sirva archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());
//? add router
app.use("/",require("./routes/index"))
app.use("/api/users",require("./routes/users"))

module.exports = app