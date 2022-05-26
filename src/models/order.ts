import client from "../database";

export type Order = {
  id?: string;
  status: string;
  userId: string;
};

export type OrderBooks = {
  id?: string;
  quantity: number;
  order_id: string;
  book_id: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id = ($1)";
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders(order_status, userid) VALUES ($1, $2) RETURNING *";
      const values = [order.status, order.userId];
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async remove(id: string) {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM orders WHERE id = ($1) RETURNING *";
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async order_books(bookOrder: OrderBooks): Promise<OrderBooks> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO order_books(quantity, order_id, book_id) VALUES ($1, $2, $3) RETURNING *";
      const values = [
        bookOrder.quantity,
        bookOrder.order_id,
        bookOrder.book_id,
      ];
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
