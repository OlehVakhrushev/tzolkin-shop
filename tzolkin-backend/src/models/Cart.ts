import pool from "../config/db";

// Получение всех товаров в корзине пользователя
export const getCartItems = async (userId: number) => {
  const res = await pool.query(
    `SELECT c.product_id, c.quantity, p.title, p.price, p.image 
     FROM cart c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = $1`,
    [userId]
  );
  return res.rows;
};

// Добавление товара в корзину
export const addToCart = async (userId: number, productId: number, quantity: number) => {
  await pool.query(
    `INSERT INTO cart (user_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, product_id)
     DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity`,
    [userId, productId, quantity]
  );
};

// Обновление количества
export const updateCartItem = async (userId: number, productId: number, quantity: number) => {
  await pool.query(
    `UPDATE cart SET quantity = $3 WHERE user_id = $1 AND product_id = $2`,
    [userId, productId, quantity]
  );
};

// Удаление товара
export const removeFromCart = async (userId: number, productId: number) => {
  await pool.query(
    `DELETE FROM cart WHERE user_id = $1 AND product_id = $2`,
    [userId, productId]
  );
};

// Очистка корзины
export const clearCart = async (userId: number) => {
  await pool.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);
};
