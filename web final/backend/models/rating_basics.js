import { Double } from "mongodb";
import mongoose from "mongoose";

let ratingSchema = new mongoose.Schema({
    tconst: {
    type: String,
  },
  // driverId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Driver'
  // },
  averageRating: {
    type: Number,
  },
  title: {
    type: Number,
  },

  numVotes: {
    type: Number,
  },
 
});

export default ratingSchema = mongoose.model(
  "rating.basics",
  ratingSchema
);
