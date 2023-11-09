const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  userId:String,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img_url: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
