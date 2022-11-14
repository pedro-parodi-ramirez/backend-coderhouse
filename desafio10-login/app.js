import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import index from './routes/index.js';
import { initSocket } from './socket.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
  secret: '3biXMV8#m5s7',
  resave: true,
  saveUninitialized: true,
}));

app.use('/', index);
app.use(express.static(path.join(__dirname, '/public')));

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`);
  console.log(`http://localhost:${server.address().port}`);
});

initSocket(server);

server.on("error", error => console.log(`Error en servidor ${error}`));