import Crew from "../models/Crew.js";
import Todo from "../models/Todo.js";
import Message from "../models/Message.js";
//add crew
export async function addCrew(req, res) {
    const { name, members, } = req.body;
    
    console.log(req.body)
    const newCrew = new Crew({
      name,
      members,
    });
    const crew = await newCrew.save();
    // console.log("user",user)
    res.status(201).json({ success: true, crew, message: "Succesfully Created" });
  }


   //get crews
export async function getCrew(req, res) {
  const crews1 = await Crew.find();
  let { id } = req.params;
  const crews = crews1.filter((obj) => {
    // check if any member's value object has the targetId
    return obj.members.some((member) => member.value._id === id);
  });
  
  // console.log(filteredCrew);
  console.log("crews",crews)
  res.json({ success: true, crews});
}


//create Todo
export async function creatTodo(req, res) {
   
    const{userId,crewId}=req.body;
    console.log(req.body)
    const todo = new Todo({
        userId,
        crewId,
    });
    const newTodo = await todo.save();
  
    res.status(201).json({ success: true, newTodo, message: "Succesfully Created" });
  }

     //get todos
export async function getTodos(req, res) {

    const todos = await Todo.find().populate({
        path: 'userId',
        // select: 'email' // fields you want to retrieve from User model
      });    
  
    
      console.log("todo",todos)
  
    res.json({ success: true, todos});
  }
  
//add message
export async function addMessage(req, res) {
   
    const{userId,message,crewId}=req.body;
    console.log(req.body)
    const newMessage = new Message({
        userId,
        message,
        crewId
    });
    const newMessage1 = await newMessage.save();
  
    res.status(201).json({ success: true,newMessage1, message: "Succesfully Created" });
  }


       //get todos
export async function getMessage(req, res) {

  const {id}=req.params;

    const messages = await Message.find({crewId:id});
  
    
      console.log("messages",messages)
  
    res.json({ success: true, messages});
  }
  

  //delete message
export async function deleteCustomer(req, res) {
    const deleteMessage = await Message.findByIdAndRemove(req.params.id);
    if (!deleteMessage) {
      return next(new AppError("Invalid Vehicle Id Provided", 400));
    }
    res.json({ success: true, deleteMessage, message: "Message Deleted" });
  }


  //update message
export async function updateMessage(req, res) {
    let { id } = req.params;
  
    try {
      let data = await Message.findById({ _id: id });
     
  
      data.message = req.body.message;
    
    
  
      await data.save();
      console.log("dataCompleProfile123", data);
      if (data) {
        res.status(200).json({
          message: "Information Updated",
          data,
        });
      } else {
        res.status(400).json("No data found");
      }
    } catch (error) {
      console.log("ERROR", error);
      res.status(500).json(error);
    }
  }