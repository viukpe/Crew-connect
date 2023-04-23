import mongoose from 'mongoose'

let userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
        

        },
        // driverId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Driver'
        // },
        email:{
            type:String,
   
        },
        password:{
            type:String,
         

        },
      
        image:{
            type:String
        },
      

    }
   
)


export default userSchema =mongoose.model("User",userSchema)