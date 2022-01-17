const dotenv = require('dotenv').config({ path: './config.env' }); 
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{}).then(()=> {
  console.log("DB connection successful") 
});

const port = process.env.PORT || 3000; //http://127.0.0.1:8000
app.listen(port, () => {
  console.log(`app running on ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
