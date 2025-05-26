import { sequelize } from "../Connection.js";
import { DataTypes } from "sequelize";

const Reviews = sequelize.define("Review", {
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIP: true,
    },
  },
  clickedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});
export default Reviews;
