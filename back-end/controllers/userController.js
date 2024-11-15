const User = require('../models/User');


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};


const editUser = async (req, res) => {
  const { name, profession, phoneNumber } = req.body;
  
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, profession, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = { getAllUsers, editUser, deleteUser };
