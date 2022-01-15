const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitizer = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const jewelRouter = require('./routes/jewelRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

app.use(helmet);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please again later."
});

app.use('/api', limiter);

app.use(express.json({limit: '10kb'}));
app.use(mongoSanitizer());
app.use(xss());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/v1/collections', jewelRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cart', cartRouter);
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
  
