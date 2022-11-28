import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import index from './routers/index.js';
import { initSocket } from './socket.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from './models/user.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

passport.use('login', new LocalStrategy({
  usernameField: 'email',
}, (email, password, done) => {
  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        console.log(`User with ${email} not found.`)
        return done(null, false)
      }
      if (password !== user.password) {
        console.log('Invalid Password')
        return done(null, false)
      }
      done(null, user)
    })
    .catch(error => {
      console.log('Error in login', error.message)
      done(error)
    })
}))

passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
}, (req, email, password, done) => {
  UserModel.findOne({ email })
    .then(user => {
      if (user) {
        console.log(`User ${email} already exists.`)
        return done(null, false)
      }
      return UserModel.create(req.body)
    })
    .then(newUser => {
      console.log(`User ${newUser.email} registration succesful.`)
      done(null, newUser)
    })
    .catch(error => {
      console.log('Error in register', error.message)
      done(error)
    })
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  UserModel.findOne({ _id })
    .then(user => done(null, user))
    .catch(done)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
  secret: '3biXMV8#m5s7',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use(express.static(path.join(__dirname, '/public')));

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`);
  console.log(`http://localhost:${server.address().port}`);
});

initSocket(server);

server.on("error", error => console.log(`Error en servidor ${error}`));