const mongoose = require("mongoose");

const { Schema } = mongoose;

const photoSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
