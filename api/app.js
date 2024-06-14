require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var mongoose = require('mongoose');
var dbConfig = require('./database/db.config');
var UserRoutes = require('./src/routes/user');
const indexRouter = require('./src/routes/index');
const EventRouter = require('./src/routes/events');
const LeaveRouter = require('./src/routes/leaves');
const AttendanceRouter = require('./src/routes/attendance');
var cors = require('cors')
app.set('port', (process.env.PORT || 4000));

app.use(cors())


// MongoDB Connection //

const connectionString = `${dbConfig.URL}/${dbConfig.DB}`;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected Successfully!');
  })
  .catch((error) => {
    console.error('Connection error', error);
    process.exit();
  });


// view engine setup //

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes 

app.use(indexRouter);
app.use('/api/auth', UserRoutes);
app.use('/api/events', EventRouter);
app.use('/api/leaves',LeaveRouter);
app.use('/api/attendance',AttendanceRouter);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  // res.status(400).send({ result: "🚫 Not Found 🚫" });
  next(createError(404));
});


// error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Run The Application

app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'));
  console.log(`App is running: 🚀 http://localhost:${app.get('port')} 🚀`)
});

module.exports = app;
