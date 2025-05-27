import reviews from "./review.js";
import url from "./url.js";
import user from "./user.js";
let associations = async () => {
  url.hasMany(reviews);
  user.hasMany(url, {
    foreignKey:{name:"UserId",allowNull:false},
    onDelete: "RESTRICT"
  });
  reviews.belongsTo(url);
  url.belongsTo(user);
};
export default associations;
