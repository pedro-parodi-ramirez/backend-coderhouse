import express from 'express';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo'
import path from 'path';
import { fileURLToPath } from 'url';
import index from './routes/index.js';
import { initSocket } from './socket.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://developer:${process.env.KEY || 'x6JYg18ip3N7gsky'}@coderhouse.wm4ogqy.mongodb.net/sessions?retryWrites=true&w=majority`,
    mongoOptions: advancedOptions,
    ttl: 60,
  }),
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