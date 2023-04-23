// import { registerUser,loginUser,getData } from "../Controllers/UserController.js";
import { addCrew,getCrew,creatTodo,getTodos,addMessage ,getMessage,deleteCustomer,updateMessage} from "../Controllers/CrewController.js";
import express from "express"
;
const router = express.Router();



  router.post("/add/crew", addCrew);
  router.get("/get/crews/:id", getCrew);
  router.post("/create/todo", creatTodo);
  router.get("/get/todos", getTodos);
  router.post("/add/message", addMessage);
  router.get("/get/messages/:id", getMessage);
  router.delete("/delete/messages/:id", deleteCustomer);
  router.put("/update/message/:id", updateMessage);




  export default  router