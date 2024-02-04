const app = require('./app');

//? seccion para validar las direcciones no validas
// Ruta para capturar todas las rutas no definidas
app.use((req, res, next) => {
  const error = new Error('Página no encontrada xd');
  error.status = 404;
  next(error);
});

// Manejador de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { title: `Error - ${err.status || 500}`,error:{message:err.message, status: err.status, stack: err.stack }});
});

//? start on server
app.listen(app.get('port'), () => {
  console.log(`La aplicación está escuchando en http://127.0.0.1:${app.get('port')}`);
});
