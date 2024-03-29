const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const bodyParser=require('body-parser');
const colors=require('colors');
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middelwares/errorMiddleware');

//routes path
const authRoutes=require('./routes/authRoutes');

 

// To allow specific origins
const corsOptions = {
  origin: 'https://ai-chatgpt-clone-2.vercel.app',
  //origin:'https://65d7637b50e9cd3c7cacdb49--rainbow-liger-ca4776.netlify.app',
  Credential:true
};


 
//dotenv
dotenv.config();
connectDB();

//rest object
const app=express();
console.log("hello");

app.use(cors(corsOptions));

app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(errorHandler)


const PORT=process.env.PORT || 8000


//API routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));



//serverlisten

app.listen(PORT,()=>{
    console.log(`server start in ${process.env.DEV_MODE} node on port no ${PORT}`);
})
