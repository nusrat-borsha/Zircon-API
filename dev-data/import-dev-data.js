const dotenv = require('dotenv').config({ path: './config.env' }); 
const fs = require('fs');
const mongoose = require('mongoose');
const Jewel = require('../models/jewelModel');
const User = require('../models/userModel');


const jewels = JSON.parse(fs.readFileSync(`${__dirname}/jewelries.json`,'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`,'utf-8'));

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{}).then(()=> {
  console.log("DB connection succesful") 
});

const importData = async () => {
    try{

        await Jewel.create(jewels);
        console.log("Data successfully loaded");

    }catch(err){
        console.log(err);
        }
    
    process.exit();
};

const deleteData = async () => {
    try{

        await Jewel.deleteMany();
        console.log("Data successfully deleted");

    }catch(err){
        console.log(err);
        }

    process.exit();
};

const userImportData = async () => {
    try{

        await User.create(users);
        console.log("User data successfully loaded");

    }catch(err){
        console.log(err);
        }

    process.exit();
};

const userDeleteData = async () => {
    try{

        await User.deleteMany();
        console.log("User data successfully deleted");

    }catch(err){
        console.log(err);
        }

    process.exit();
};

console.log(process.argv);
// input : node dev-data/import-dev-data.js  --import
// output: 
//     '--import' <-- so if we write --import or --delete then it will carry out that function
//input : node dev-data/import-dev-data.js  --deleteUser
//node dev-data/import-dev-data.js  --importUser

if (process.argv[2] === '--import'){
    importData();
}
else if (process.argv[2] === '--delete'){
    deleteData();
}
else if (process.argv[2] === '--importUser'){
    userImportData();
}
else if (process.argv[2] === '--deleteUser'){
    userDeleteData();
}