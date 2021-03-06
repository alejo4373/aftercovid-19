var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware')
var postcssMiddleware = require('postcss-middleware')
var autoprefixer = require('autoprefixer')

var app = express();

app.set('view engine', 'pug')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
}))

app.use('/stylesheets', postcssMiddleware({
  plugins: [autoprefixer()],
  src: (req) => path.join(__dirname, 'public/stylesheets', req.path)
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/ilearned', (req, res, next) => {
  res.render('board', { title: "Have Learned..." })
});

app.use('/iwanttodo', (req, res, next) => {
  res.render('board', { title: "Want to Do..." })
});

app.use('/', (req, res, next) => {
  res.render('index')
});

module.exports = app;
