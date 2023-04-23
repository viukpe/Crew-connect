import mongoose from 'mongoose'

let messageSchema=new mongoose.Schema(
    {
      
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type:String,
          
        },
        crewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Crew'
        },
    
      

    },
    {
        timestamps: true
    }
    
   
)


export default messageSchema =mongoose.model("Message",messageSchema)