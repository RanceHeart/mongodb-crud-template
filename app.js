const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Library API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['app.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

/**
 * @swagger
 * /users:
 *  post:
 *    description: Express say respond
 *    parameters:
 *    - name: user
 *      description: user name
 *      in: formData
 *      required: true
 *      type: string
 *      default: 'user'
 *    responses:
 *      200:
 *        description: Success
 *
 */
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'got a 404 error, wait for handle'));
});

// error handler: print error only on
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
