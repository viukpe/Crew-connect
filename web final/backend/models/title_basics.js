import { Int32 } from 'mongodb'
import mongoose from 'mongoose'

let titleBasics=new mongoose.Schema(
    {
        tconst:{
            type:String,
        

        },
      
        titleType:{
            type:String,
   
        },
        primaryTitle:{
            type:String,
         

        },
      
        originalTitle:{
            type:String
        },
        isAdult:{
            type:Number
        },
        startYear:{
            type:Number,
        },
        endYear:{
            type:String
        },
      
        runtimeMinutes:{
            type:Number 
        },
        genres:{
            type:String
        },
      

    }
   
)


export default titleBasics =mongoose.model("title.basics",titleBasics)