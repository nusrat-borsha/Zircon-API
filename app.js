const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const jewelRouter = require('./routes/jewelRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/v1/collections', jewelRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next)=>{
  next(new AppError(`Cant find ${req.originalUrl}`, 404));
})
app.use(globalErrorHandler);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
  }

module.exports = app;
  
