import User from "../DB/models/users.js";
import bcrypt from "bcryptjs";
import { CreateToken } from "../middleware/token_creation.js";

export const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.create({ email, username, password });
    res.status(201).json(user);
  } catch (error) {
    if(error.status!=500)
    {const messages = error.errors.map((e) => e.message);
    return res.status(400).json({ errors: messages });}
    
};}

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    let correctPass = await bcrypt.compare(password, user.password);
    if (correctPass) {
      let token = CreateToken(user.id);
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
  const user = await User.findOne({ where: { id: req.userId } });

  if (user) {
    
    return res.status(200).json(user);
  }
  else{
        return res.status(401).json({message:"Please login again"});
  }
};

export const UpdateProfile = async (req, res) => {
  const { username } = req.body;

  // Find the user by ID (assumes you're using req.userId from auth middleware)
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ message: "please login" });
    }

    // Update username
    await User.update({ username: username }, { where: { id: req.userId } });

    // Fetch the updated user
    const updatedUser = await User.findByPk(req.userId, {
      attributes: ["username", "UserN"],
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    if(error.status!=500) 
    return res.status(400).json({ error })
  }
};
export const deleteAccount = async (req, res) => {
    const user = await User.destroy({ where: { id: req.userId } });
    return res.json(user);
 
};
