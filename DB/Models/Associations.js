import reviews from "./reviews.js";
import url from "./urls.js";
import user from "./users.js";
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
