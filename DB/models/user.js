import { sequelize } from "../Connection.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

export const user = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3],
          msg: "Username must be at least 3 characters long",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "please enter a valid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: "Password must be at least 3 characters long",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = 8;
        user.password = await bcrypt.hash(user.password, saltRounds);
      },
    },
  }
);

export default user;
