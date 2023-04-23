import express from "express"
import cors from "cors"
import mongoose from "mongoose"

// const customerRouter =require("./Routes/CustomerRoutes");

import bodyParser from "body-parser"
import userRouter from "./Routes/UserRoutes.js"
import crewRouter from './Routes/CrewRoutes.js'

import Mong from "./connection/connect.js"
const app= express();

app.use(express.json());
app.use(cors());



app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/api",userRouter);
app.use("/api",crewRouter);

app.use("/profile", express.static("upload"));

// const db = await Mong.conne().then( async(conn) => {
//   console.log(Mong.db);
//   console.log("Database is connected");
 
// })
// .catch((err) => {
//   console.log(err);
//   console.log("Database is not connected");
// });

// save record even if it doesn't match the schema
mongoose.set("strictQuery", false);
 mongoose
  .connect('mongodb://localhost:27017/crewdb')
  .then( async(conn) => {
    // const db = mongoose.connection.db;
    // await db.collection('name.basics').find().toArray((err, result) => {
    //   console.log(result,"hhy")
     
    // });
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database is not connected");
  });






// const PORT = process.env.PORT || 5000;

// app.listen(PORT,()=>{
//   console.log(`listening on port ${PORT}`);

// })
 const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`listening on port  ${PORT}`);

})


