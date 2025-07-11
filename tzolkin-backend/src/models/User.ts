import pool from "../config/db";

interface NewUser {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({ name, email, password }: NewUser) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};
