import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  caption: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: {
    type: Date,
    default: Date.now,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: String,
  },
});

export const Post = mongoose.model("Post", postSchema);
