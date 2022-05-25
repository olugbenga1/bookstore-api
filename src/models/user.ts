import bcrypt from "bcrypt";
import client from "../database";

export type User = {
  username: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = "SELECT * FROM users";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release;
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot return users ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users(username, password_digest) VALUES ($1, $2) RETURNING *";
      const conn = await client.connect();
      const saltrounds = process.env.SALT_ROUNDS!;
      const hash = await bcrypt.hash(
        user.password + pepper,
        parseInt(saltrounds)
      );
      const result = await conn.query(sql, [user.username, hash]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot return new User ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot return user with id ${id}`);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id = ($1) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete user of id ${id}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const sql = "SELECT password_digest FROM users WHERE username = ($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      const correctPassword = await bcrypt.compare(
        password + pepper,
        user.password_digest
      );
      if (correctPassword) {
        return user;
      }
    }
    return null;
  }
}
