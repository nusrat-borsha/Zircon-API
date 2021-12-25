const dotenv = require('dotenv').config({ path: './config.env' }); 
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
  useNewUrlParser : true,
  useUnifiedTopology: true,
}).then(()=> {
  console.log("DB connection succesful") 
});

const port = process.env.PORT || 3000; //http://127.0.0.1:8000
app.listen(port, () => {
  console.log(`app running on ${port}`);
});
