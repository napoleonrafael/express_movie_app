const path = require('path');
const express = require('express');
const session = require('express-session');
const PORT = process.env.PORT || 3030;

require('dotenv').config();

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'keyboardasdfsdafsdfafasdfasdcat',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use((req, res, next) => {
  res.locals.title = 'movie app';
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRouter);
app.use('/movies', moviesRouter);

app.listen(PORT, (err) =>
  console.log(`${err ? err : `running on PORT ${PORT}`}`),
);
