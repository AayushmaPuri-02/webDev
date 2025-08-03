const mongoose = require("mongoose");
const initdata = require("./data");
const Tasks = require("../models/task.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/taskTracker';
main().then(()=>{
    console.log('connected to DB');
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Tasks.deleteMany({});
    await Tasks.insertMany(initdata.data);
    console.log("data was initialized");
}

initDB();