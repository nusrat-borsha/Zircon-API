const dotenv = require('dotenv').config({ path: './config.env' }); 
const fs = require('fs');
const mongoose = require('mongoose');
const Jewel = require('../models/jewelModel');


const jewels = JSON.parse(fs.readFileSync(`${__dirname}/jewelries.json`,'utf-8'));

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
  useNewUrlParser : true,
  useCreateIndex : true,
  useFindAndModify : false,
  useUnifiedTopology: true,
}).then(()=> {
  console.log("DB connection succesful") 
});

const importData = async () => {
    try{

        await Jewel.create(jewels);
        console.log("Data successfully loaded");

    }catch(err){
        console.log(err);
        }
};

const deleteData = async () => {
    try{

        await Jewel.deleteMany();
        console.log("Data successfully deleted");

    }catch(err){
        console.log(err);
        }
};

console.log(process.argv);
// input : node dev-data/import-dev-data.js  --import
// output: 
//     '--import' <-- so if we write --import or --delete then it will carry out that function

if (process.argv[2] === '--import'){
    importData();
}
else{
    deleteData();
}