const { User, Thought } = require("../models");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a single user with populated data
const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
			.populate("thoughts")
			.populate("friends");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.json(updatedUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// DELETE user w/ BONUS
const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Bonus: Remove user's associated thoughts
		await Thought.deleteMany({ userId: req.params.id });
		res.status(204).json({
			message: "User and associated thoughts deleted",
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Add friend logic
const addFriend = async (req, res) => {
	try {
		// Add friendId to the userId's friends list
		const user = await User.findByIdAndUpdate(
			req.params.userId,
			{ $addToSet: { friends: req.params.friendId } }, // using $addToSet to avoid duplicates
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Remove friend logic
const removeFriend = async (req, res) => {
	try {
		// Remove friendId from the userId's friends list
		const user = await User.findByIdAndUpdate(
			req.params.userId,
			{ $pull: { friends: req.params.friendId } },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	removeFriend,
};
