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

// user swagger config
/**
 * @swagger
 * /users/get:
 *  get:
 *    description: Get all users in the database
 *    responses:
 *      200:
 *        description: Success
 *
 */

/**
 * @swagger
 * /users/delete:
 *  post:
 *    description: Delete a user by id
 *    parameters:
 *    - name: id
 *      in: formData
 *      description: user id
 *      required: true
 *      type: string
 *      default: '5094'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: False
 *
 */

/**
 * @swagger
 * /users/insert:
 *  post:
 *    description: Insert user in to database
 *    parameters:
 *    - name: name
 *      description: user name
 *      in: formData
 *      required: true
 *      type: string
 *      default: 'user'
 *    - name: email
 *      description: email address
 *      in: formData
 *      required: true
 *      type: string
 *      default: 'user@address'
 *    responses:
 *      200:
 *        description: Success
 *
 */

/**
 * @swagger
 * /users/update:
 *  post:
 *    description: Update a user using userID
 *    parameters:
 *    - name: id
 *      description: user id
 *      in: formData
 *      required: true
 *      type: string
 *      default: 'user'
 *    - name: name
 *      description: user name
 *      in: formData
 *      required: true
 *      type: string
 *      default: 'user'
 *    - name: email
 *      description: email address
 *      in: formData
 *      required: true
 *      type: string
 *      default: 'user@address'
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
