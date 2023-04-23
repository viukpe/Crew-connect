import { registerUser,loginUser,getData ,getUsers,getMoviesData} from "../Controllers/UserController.js";
import express from "express"
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
    destination: "./upload",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  const upload = multer({
    storage: storage,
  });

  router.post("/register", upload.single("photo"), registerUser);
  router.post("/login", loginUser);
  router.get("/getData/:name/:profession/:page", getData);
  router.get("/getUsers/:id", getUsers);
  router.get("/getMovieData/:type/:name/:page", getMoviesData);


  export default  router