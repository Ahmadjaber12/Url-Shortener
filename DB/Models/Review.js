import { sequelize } from "../Connection.js";
import { DataTypes } from "sequelize";

const Reviews=sequelize.define('Review',{
    IP_Address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIP: true
    }
  },
  ClickedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
})
export default Reviews;