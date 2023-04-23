import mongoose from 'mongoose'

let todoSchema=new mongoose.Schema(
    {
      
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        crewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Crew'
        },
       
      
    
      

    }
   
)


export default todoSchema =mongoose.model("Todo",todoSchema)