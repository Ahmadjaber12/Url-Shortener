import { Op, Sequelize } from "sequelize";
import url from "../DB/models/urls.js";
import User from "../DB/models/users.js";

export const createUrl = async (req, res) => {
  const { origionalURL } = req.body;
  const URL = await url.create({ origionalURL, UserId: req.userId });
  let shortUrl = `https://www.shortUrl.com/${URL.code}`;

  return res.json({ shortUrl });
};
export const urlRedirection = async (req, res) => {
  const { code } = req.params;
  const URL = await url.findOne({ where: { code } });

  return res.json(`redirect to ${URL.origionalURL}`);
};
export const getUrl = async (req, res) => {
  const { id } = req.params;
  const URL = await url.findOne({ where: { id } });
  if (!URL) {
    return res.status(404).json({ message: "Not found" });
  }
  let user = await url.getUser(); // lazy loading
  return res.status(200).json({ URL, user });
};

export const getallUrls = async (req, res) => {
  const size = req.query.size || 2;
  const fieldName = req.query.fieldName || "ExpiresIn";

  const { count, rows: urls } = await url.findAndCountAll({
    where: { UserId: { [Op.is]: null } },
    limit: +size,
    attributes: [],
    include: { model: User },
    order: [[User, "username", "DESC"]], // Eager Loading
  });

  if (count) {
    return res.json(urls);
  } else {
    return res.status(200).json({ message: "No Rows" });
  }
};
export const deleteUrl = async (req, res) => {
  const { id } = req.params;
  const URL = await url.findByPk(id);
  if (URL) {
    await url.destroy({ where: { id } });
    return res.status(204).json({ message: "Url deleted successfully" });
  } else {
    return res.status(200).json({ message: "No Url Found" });
  }
};
