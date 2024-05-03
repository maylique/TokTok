import { sendVerificationEmail } from "../utils/mail.js";
import { uploadImage } from "../utils/uploadImage.js";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {v4 as uuid} from "uuid"

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const registerUser = async (req, res) => {
  const verificationToken = uuid()
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    try {
      const user = await User.findOne({ email });
      if (user) {
        res.status(401).json({ message: "User already exists" });
      } else {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          username,
          passwordHash,
          email,
          emailVerified: false,
          verificationToken,
        })
        
        res.status(201).json(newUser);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const verifyUser = async (req, res) => {
  try{
    const {verificationToken} = req.body
    if (!verificationToken) return res.status(404).json('EmailToken not found...')
    const user = await User.findOne({verificationToken})
  
    if (user) {
      user.verificationToken = null
      user.emailVerified = true
  
      await user.save()
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
      })
    } else res.status(404).json("Email verification failed");
  }catch (error) { 
  console.log(error)
  res.status(500).json(error.message);
  }
}


export const getUserDetails = async (req, res) => {
  try {
    console.dir(req.user);

    const { id } = req.params;
    const user = await User.findById(id).lean();

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.json([user]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCurrentUserDetails = async (req, res) => {
  console.dir(req.user);
  const { email } = req.user;
  const user = await User.findOne(
    { email },
    { username: true, email: true }
  ).lean();
  res.json(user);
};

export const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const updates = {};
  const fieldsToUpdate = [
    "username",
    "email",
    "bio",
    "gender",
    "phone",
    "website",
    "birthdate",
    "job",
  ];

  fieldsToUpdate.forEach((field) => {
    if (req.body[field]) {
      updates[field] = req.body[field];
    }
  });

  if (req.file) {
    const response = await uploadImage(req.file.buffer);
    updates.profilePictureUrl = response.secure_url;
  }

  const user = await User.findByIdAndUpdate({ _id: id }, updates, {
    new: true,
  });
  if (!user) res.status(401).json({ message: "User not found" });
  res.json(user);
};

export const setFollow = async (req, res) => {
  const { id } = req.params;
  const  {userId}  = req.user;
  const follower = await User.findById(userId);
  const updateFollowers = await User.findByIdAndUpdate(
    { _id: id },
    { $push: { followers: follower._id } },
    { new: true }
  );
  const updateFollowing = await User.findByIdAndUpdate(
    { _id: follower._id },
    { $push: { following: id } },
    { new: true }
  );
  if (!updateFollowers || !updateFollowing) {
    res.status(401).json();
    return;
  }
  res.json({updateFollowers: updateFollowers, updateFollowing:updateFollowing});
  
};

export const deleteFollow = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const follower = await User.findById(userId);
  const updateFollowers = await User.findByIdAndUpdate(
    { _id: id },
    { $pull: { followers: follower._id } }
    );
  const updateFollowing = await User.findByIdAndUpdate(
    { _id: follower._id },
    { $pull: { following: id } }
  );
  if (!updateFollowers || !updateFollowing) {
    res.status(401).json();
    return;
  }
  res.json({updateFollowers:updateFollowers, updateFollowing:updateFollowing});
};
