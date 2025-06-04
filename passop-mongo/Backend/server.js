import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from "cors";
import { Result } from 'postcss';

const User = mongoose.model("passop",new mongoose.Schema({
  site:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }}))

// Ensure dotenv is configured before accessing process.env
dotenv.config();

const app = express()
const port = 3000
const mongo_uri = process.env.MONGO_URI

app.use(bodyParser.json());
app.use(cors());




mongoose.connect(mongo_uri).then(()=>{
  console.log(`Database connected successfully on port ${port}`)
}).catch((err)=>{
  console.log(err);
})

app.get('/',async function(req, res){
    try{
      const userData = await User.find();
    
    if(!userData){
      console.log("No users found");
    }

    res.status(200).json(userData);
    }catch(error){
      return res.status(500).json({msg:"Internal server error"})
    }
})

app.post("/",async function(req,res){
    try{
       const password = await User(req.body)

    const findResult = await User.insertOne(password);
    res.status(200).json({success:true,result:findResult})
    }catch(error){
      return res.status(500).json({msg:"Internal server error"})
    }
    
})

app.delete("/",async function(req,res){
  try{
    const password = await req.body;
    
    await User.deleteOne(password)
    res.status(200).json({msg:"Deleted"})
    }catch(error){
      return res.status(500).json({msg:"Internal server error"})
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
