const pool = require("../config/db");

const getAllCollections = async () => {
  const res = await pool.query("SELECT * FROM collections");
  return res.rows;
};

const getCollectionById = async (id) => {
  const res = await pool.query("SELECT * FROM collections WHERE id = $1", [id]);
  return res.rows[0];
};

module.exports = {
  getAllCollections,
  getCollectionById,
};
