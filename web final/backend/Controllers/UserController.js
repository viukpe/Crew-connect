import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import fileData from './../title.json' assert { type: "json" };
import name_basics from "../models/name_basics.js";
import title_basics from "../models/title_basics.js";
import { MongoClient } from "mongodb";
import title_akas from "../models/title_akas.js";
import rating_basics from "../models/rating_basics.js";
//register User
export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  console.log("req.body=========register", req.file);
  const checkMail = await User.find({ email });
  if (checkMail.length != 0) {
    res.status(400).json({ success: false, message: "User Already Exist" });
  }
  if (!(email && password)) {
    // return next(new AppError("Please Provide Email and Password"));
  }
  const hashedpassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    name,
    email,

    password: hashedpassword,
    image: `/profile/${req.file.filename}`,
  });
  const user = await newUser.save();
  console.log("user", user);
  res.status(201).json({ success: true, user, message: "Succesfully Created" });
}

//Login User
export async function loginUser(req, res) {
  console.log("body=====", req.body);
  const { email, password } = req.body;

  try {
    let data = await User.findOne({ email: email });

    if (!data) {
      console.log("!data");
      res.status(401).json({
        message: "No User Exist with Email",
        status: false,
      });
    } else {
      console.log("=========", data);
      const isMatch = await bcrypt.compare(password, data.password);
      console.log("isMatch", isMatch);
      if (isMatch) {
        const token = jwt.sign(data.toObject(), "secret", { expiresIn: "7d" });
        res.status(200).json({
          status: true,
          message: "UserLogin Successfully",
          user: data,
          token,
        });
      } else {
        res.status(400).json({
          message: "Invalid Email or password",
          status: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error_Message: error,
      status: false,
    });
  }
}

//get import data
export async function getData(req, res) {
  const { name, profession, page } = req.params;
  let obj = {};
  let ab = {};
  let offset = 3;
  let skip = (page - 1) * offset;
  let counter = null;
  let regTemp = "/" + profession + "/";
  if (profession === "search") {
    obj = { primaryName: name };
    ab = { primaryName: name };
    console.log("if");
  } else if (name === " ") {
    obj = { primaryProfession: { $regex: new RegExp(profession) } };
    ab = { primaryProfession: { $in: [profession] } };
    console.log("else");
  } else {
    obj = {
      primaryName: name,
      primaryProfession: { $regex: new RegExp(profession) },
    };
    ab = {
      primaryName: name,
      primaryProfession: { $in: new RegExp(profession) },
    };
  }
  console.log(name, profession, page, obj);
  let len = name_basics
    .countDocuments(ab)
    .then((data) => {
      counter = data;
    })
    .catch((err) => {
      console.log(err, "err");
    });
  name_basics
    .aggregate([
      {
        $match: obj,
      },
      { $skip: skip },
      { $limit: 3 },
      {
        $lookup: {
          from: "title.basics",
          let: { movieIds: { $split: ["$knownForTitles", ","] } },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$tconst", "$$movieIds"] },
              },
            },
          ],
          as: "movies",
        },
      },
    ])
    .then((rese) => {
      res.status(200).json({
        result: rese,
        count: counter,
      });
      console.log(rese, "res");
    })
    .catch((err) => {
      console.log(err, "err");
    });
}

//get users
export async function getUsers(req, res) {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select(
      "-password"
    );
    console.log(users); // Array of users (excluding the specified user)
    res.json({ success: true, users });
  } catch (err) {
    console.error(err);
  }
}


export async function getMoviesData(req, res) {
  const { page, type,name } = req.params;
  console.log(page,type,name)
  let offset = 2;
  let skip = (page - 1) * offset;

  let count = null;
  let obj={};
  let ab={};
  if (type === " ") {
    obj = { primaryTitle: name };
    ab = { primaryTitle: name };
    console.log("if");
  } else if (name === " ") {
    obj = { genres: { $regex: new RegExp(type) } };
    ab = { genres: { $in: [type] } };
    console.log("else");
  } else {
    obj = {
      primaryTitle: name,
      genres: { $regex: new RegExp(type) },
    };
    ab = {
      primaryTitle: name,
      genres: { $in: new RegExp(type) },
    }}
    ;
  title_basics
    .countDocuments(obj)
    .then((ree) => {
      count = ree;
    })
    .catch((err) => {
      console.log(err, "err");
    });
    console.log("count",count)
   
    
  title_basics
    .aggregate([
      {
        $match: obj,
      },

      {
        $lookup: {
          from: "title.akas",
          localField: "tconst",
          foreignField: "titleId",
          as: "akas",
        },
      },
      {
        $lookup: {
          from: "rating.basics",
          localField: "tconst",
          foreignField: "tconst",
          as: "ratings",
        },
      },
      { $skip: skip },
      {
        $limit: 2,
      },
    ])
    .then((rese) => {
      res.status(200).json({
        result: rese,
        count: count,
      });
      console.log(rese, "res");
    })
    .catch((err) => {
      console.log(err, "err");
    });
}
