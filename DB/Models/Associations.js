import Reviews from "./reviews.js";
import Urls from "./urls.js";
import User from "./users.js";
let associations = async () => {
  Urls.hasMany(Reviews);
  User.hasMany(Urls, {
    foreignKey:{name:"UserId",allowNull:false},
    onDelete: "RESTRICT"
  });
  Reviews.belongsTo(Urls);
  Urls.belongsTo(User);
};
export default associations;
