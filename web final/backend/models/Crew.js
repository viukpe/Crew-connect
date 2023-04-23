import mongoose from 'mongoose'

let crewSchema=new mongoose.Schema(
    {
        name:{
            type:String,
        

        },
        // driverId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Driver'
        // },
        members:{
            type:Array,
   
        },
    
      

    }
   
)


export default crewSchema =mongoose.model("Crew",crewSchema)