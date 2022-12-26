import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { variables } from './config/config.js';
import index from './routes/index.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATUS = variables.STATUS;

configApp();

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`);
  console.log(`http://localhost:${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));

/**********************************************************************************************/
/******************************************* CONFIG *******************************************/
/**********************************************************************************************/

// Config app
function configApp() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', index);
  app.use(express.static(path.join(__dirname, '/public')));

  app.use(function (req, res) {
    let message = {
      error: -2,
      status: 'Route not implemented'
    }
    res.status(STATUS.NOT_FOUND).json(message);
  });
}