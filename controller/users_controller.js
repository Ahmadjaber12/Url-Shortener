import bcrypt from "bcryptjs";
import { CreateToken } from "../middleware/token_creation.js";
import user from "../DB/models/users.js";

export const register = async (req, res) => {
  const { email, username, password } = req.body;
  const User = await user.create({ email, username, password });
  return res.status(201).json(User);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const User = await user.findOne({ where: { email } });
  if (User) {
    let correctPass = await bcrypt.compare(password, User.password);
    if (correctPass) {
      let token = CreateToken(User.id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true if using HTTPS
        maxAge: 2 * 60 * 60 * 1000, // 1 day
      });
      return res.status(200).json({ token });
    }
  } else {
    return res.status(400).json({ message: "wrong email or password" });
  }
};
export const Profile = async (req, res) => {
  const User = await user.findByPk(req.userId);

  if (User) {
    return res.status(200).json(User);
  } else {
    return res.status(401).json({ message: "Please login again" });
  }
};

export const UpdateProfile = async (req, res) => {
  const { username } = req.body;

  // Find the user by ID (assumes you're using req.userId from auth middleware)
  const User = await user.findByPk(req.userId);

  // Update username
  await user.update({ username }, { where: { id: req.userId } });

  // Fetch the updated user
  const updatedUser = await user.findByPk(req.userId, {
    attributes: [["username", "userN"]],
  });

  return res.status(200).json(updatedUser);
};
export const deleteAccount = async (req, res) => {
  const User = await user.destroy({ where: { id: req.userId } });
  return res.json(User);
};
