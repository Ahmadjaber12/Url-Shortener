import Reviews from "./Review.js";
import Urls from "./Urls.js";
import User from "./User.js";
let associations=async()=>{
        Reviews.belongsTo(Urls)
        Urls.belongsTo(User);
        Urls.hasMany(Reviews)
        User.hasMany(Urls)
    }
export default associations;