import { Op } from "sequelize";
import Urls from "../DB/models/urls.js";
import User from "../DB/models/users.js";

export const CreateUrl = async (req, res) => {
  const { origionalURL } = req.body;
  const url = await Urls.create({ origionalURL, UserId: req.userId });
  let ShortUrl = `https://www.shortUrl.com/${url.code}`;

  return res.json({ ShortUrl });
};
export const UrlRedirection = async (req, res) => {
  const { code } = req.params;
  const url = await Urls.findOne({where:{ code} });

  return  res.json(`redirect to ${url.origionalURL}`);

};
export const getUrl = async (req, res) => {
  const { id } = req.params;
  const url = await Urls.findOne({ where: { id } });
  if (!url) {
    return res.status(404).json({ message: "Not found" });
  }
  let user=await url.getUser(); // lazy loading 
  return res.status(200).json({ url,user }); 
};

export const getAllURLS = async (req, res) => {
  const size = req.query.size || 2;
  const fieldName = req.query.fieldName || "ExpiresIn";

  const { count, rows: urls } = await Urls.findAndCountAll({
    where: { id: { [Op.lt]: 2 } },
    order: [[fieldName, "ASC"]],
    limit: +size,
    attributes: ["origionalURL"],
    include: { model: User, attributes: ["Username"] }, // Eager Loading
  });
  if (count) {
    return res.json(urls);
  } else {
    return res.status(200).json({ message: "No Rows" });
  }
};
export const DeleteUrl = async (req, res) => {
  const { id } = req.params;
  const url = await Urls.findByPk(id);
  if (url) {
    await Urls.destroy({ where: { id } });
    return res.status(204).json({ message: "Url deleted successfully" });
  } else {
    return res.status(200).json({ message: "No Url Found" });
  }
};
