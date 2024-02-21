const mongoose=require('mongoose');
const colors=require('colors');

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('monngodb connect sucessfully');
    }
    catch(error){
        console.log(`mongodb is not connect ${error}`.bgRed.white);

    }
}

module.exports=connectDB;