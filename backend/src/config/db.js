const mongoose =require('mongoose');

const connectDB =async () => {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB Connected");
    } catch (error){
        console.log("mongoDB connection failed",error.message);
        process.exit(1);
    }
};
module.exports =connectDB;