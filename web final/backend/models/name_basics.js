import mongoose from "mongoose";

let nameBasicsSchema = new mongoose.Schema({
  nconst: {
    type: String,
  },
  // driverId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Driver'
  // },
  primaryName: {
    type: String,
  },
  birthYear: {
    type: String,
  },

  deathYear: {
    type: String,
  },
  primaryProfession: {
    type: String,
  },
  knownForTitles: {
    type: String,
  },
});

export default nameBasicsSchema = mongoose.model(
  "name.basics",
  nameBasicsSchema
);
