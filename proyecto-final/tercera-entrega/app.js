import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { variables } from './config/config.js';
import index from './routes/index.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { userDAO as userAPI} from './daos/index.js';
import { isValidPassword, encryptPassword } from './config/utils.js';

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
  app.use(expressSession({
    secret: '3biXMV8#m5s7',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 30000,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());


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

/**********************************************************************************************/
/****************************************** PASSPORT ******************************************/
/**********************************************************************************************/

passport.use('sign-in', new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    userAPI.getByEmail(email)
      .then(user => {
        if (!user) {
          console.log(`User with ${email} not found.`);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          console.log('Invalid Password');
          return done(null, false);
        }
        done(null, user);
      })
      .catch(error => {
        console.log('Error in login\n', error.message);
        done(error);
      })
  }))

passport.use('sign-up', new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    userAPI.getByEmail(email)
      .then(user => {
        if (user) {
          console.log(`User ${email} already exists.`);
          return done(null, false);
        }
        const newUser = {
          ...req.body,
          password: encryptPassword(password)
        }
        userAPI.create(newUser)
          .then(newUser => {
            console.log(`User ${newUser.email} registration succesful.`);
            done(null, newUser);
          })
      })
      .catch(error => {
        console.log('Error in register', error.message);
        done(error);
      })
  }))

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser((_id, done) => {
  userAPI.getById(_id)
    .then(user => done(null, user))
    .catch(done)
})