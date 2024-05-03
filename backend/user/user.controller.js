import { sendMail } from "../utils/mail.js";
import { uploadImage } from "../utils/uploadImage.js";
import crypto from 'crypto'
import { User } from "./user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
	const users = await User.find();
	res.json(users);
};

export const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			res.status(400).json({ message: "Please provide all fields" });
		} else {
			const user = await User.findOne({ email });
			const passwordHash = await bcrypt.hash(password, 10);
			if (user) {
				res.status(401).json({ message: "User already exists" });
			} else {
				const verificationCode = crypto.randomInt(100000, 999999);
				const newUser = await User.create({
					username,
					passwordHash,
					email,
					verificationCode,
				});
        
				const url = `${process.env.BACKEND}/users/${user._id}/verify/${verificationCode}`;
				await sendMail(user.email, "Verify Email", url);
        
				res.json(newUser);
				res
        .status(201)
        .send({ message: "An Email was sent to your account, please verify" });
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
};

export const verifyUser = async (req, res) => {
  const {id}  = req.params
  try {
		const user = await User.findOne({ id});
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
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
	const { userId } = req.user;
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
	console.log("UFollowing", updateFollowing);
	if (!updateFollowers || !updateFollowing) {
		res.status(401).json();
		return;
	}
	res.json({
		updateFollowers: updateFollowers,
		updateFollowing: updateFollowing,
	});
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
	console.log("UFollowing", updateFollowing);
	if (!updateFollowers || !updateFollowing) {
		res.status(401).json();
		return;
	}
	res.json({
		updateFollowers: updateFollowers,
		updateFollowing: updateFollowing,
	});
};
