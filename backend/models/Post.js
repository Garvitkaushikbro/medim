const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
  },
  topic: {
    type: String,
    required: [true, "Please enter an topic"],
    lowercase: true,
  },
  image: {
    type: String,
    required: [true, "Please enter a image"],
  },
  text: {
    type: String,
    required: [true, "Please enter a text"],
  },
  author: {
    type: String,
    required: [true, "Please enter a author"],
  },
  likes: {
    type: [String],
  },
  comments: [
    {
      text: {
        type: String,
      },
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  views: {
    type: [String],
    required: [true, "Please enter a password"],
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
