import { User } from "../user/user.model.js";
import { Comment } from "./comment.model.js";

export const getComments = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};

export const getSingleComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(401).json({ message: "Comment not found" });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { commentId, userId } = req.params;

    const comment = await Comment.findById(commentId);

    const userLiked = comment.likes.includes(userId);

    if (userLiked) {
      await Comment.findByIdAndUpdate(commentId, { $pull: { likes: userId } });
    } else {
      await Comment.findByIdAndUpdate(commentId, { $push: { likes: userId } });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

export const addReply = async (req, res) => {
  const { commentId, userId } = req.params;
  const { content } = req.body;
  console.dir("halllllllll", commentId, userId, content);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = new Comment({
      content,
      username: user.username,
      authorId: userId,
    });

    await newComment.save();
    const updatedComment = await Comment.findByIdAndUpdate(commentId, {
      $push: { comments: newComment._id },
    });

    if (!updatedComment) {
      return res.status(404).json({ message: "comment not found" });
    }

    res.json({ message: "Reply added", comment: updatedComment });
  } catch (error) {
    console.error("Error adding Reply:", error);
    res.status(500).json({ message: "Failed to add Reply" });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { commentId, userId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.authorId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment" });
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(401).json({ message: "Comment not deleted" });
    }

    return res.status(200).json({ message: "Comment successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
