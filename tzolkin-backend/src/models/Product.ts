import pool from "../config/db";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  collection_id: number;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await pool.query("SELECT * FROM products");
  return res.rows;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const res = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return res.rows[0] || null;
};
