import pool from "../config/db";

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderInput {
  userId: number;
  total: number;
  address: string;
  items: OrderItem[];
}

export const createOrder = async ({
  userId,
  total,
  address,
  items,
}: CreateOrderInput): Promise<{ orderId: number }> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderRes = await client.query(
      `INSERT INTO orders (user_id, total, address)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [userId, total, address]
    );

    const orderId = orderRes.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.productId, item.quantity, item.price]
      );
    }

    await client.query("DELETE FROM cart WHERE user_id = $1", [userId]);
    await client.query("COMMIT");

    return { orderId };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
