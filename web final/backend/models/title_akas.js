import mongoose from "mongoose";

let titleAkasSchema = new mongoose.Schema({
  titleId: {
    type: String,
  },
  // driverId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Driver'
  // },
  ordering: {
    type: Number,
  },
  title: {
    type: String,
  },

  region: {
    type: String,
  },
  language: {
    type: String,
  },
  types: {
    type: String,
  },
  attributes: {
    type: String,
  },
  isOriginalTitle: {
    type: Number,
  },
});

export default titleAkasSchema = mongoose.model(
  "title.akas",
  titleAkasSchema
);
