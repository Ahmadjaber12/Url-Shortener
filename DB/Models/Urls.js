import { sequelize } from "../Connection.js";
import { DataTypes } from "sequelize";

const generateRandomCode = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log("code in method", result);

  return result;
};
const TwoDaysDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 2); // Add 2 days
  return date.toISOString().split("T")[0];
};

const Urls = sequelize.define(
  "URLS",
  {
    origionalURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "please enter a valid Url",
        },
        async isUrlReachable(url) {
          try {
            const res = await fetch(url, { method: "HEAD", timeout: 5000 });
            if (!res.ok) {
              throw new Error("URL is not reachable");
            }
          } catch (err) {
            throw new Error("URL is not reachable");
          }
        },
      },
    },
    code: {
      type: DataTypes.STRING,
    },
    expiresIn: {
      type: DataTypes.DATEONLY,
      defaultValue: TwoDaysDate(),
    },
  },
  {
    hooks: {
      beforeCreate: async (url) => {
        const code = generateRandomCode();
        console.log("code in hook", code);

        url.code = code;
      },
    },
  }
);
export default Urls;
