import client from "../database";

export type Book = {
  title: string;
  totalPages: number;
  author: string;
  type: string;
  summary: string;
};

export class BookStore {
  async index(): Promise<Book[]> {
    try {
      const sql = "SELECT * FROM books";
      const conn = await client.connect();
      const res = await conn.query(sql);
      conn.release;
      return res.rows;
    } catch (error) {
      throw new Error(`Could not fetch data for all books. ${error}`);
    }
  }

  async create(book: Book): Promise<Book> {
    try {
      const sql =
        "INSERT INTO books(title, total_pages, author, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING *";
      const values = [
        book.title,
        book.totalPages,
        book.author,
        book.type,
        book.summary,
      ];
      const conn = await client.connect();
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Can not create new book entry. ${error}`);
    }
  }

  async show(id: string): Promise<Book> {
    try {
      const sql = "SELECT * FROM books WHERE id=($1)";
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Can not show entry ${id}. Error ${error}`);
    }
  }

  async update(id: string, book: Book): Promise<Book> {
    try {
      const sql =
        "UPDATE books SET author=($1), title=($2) WHERE id=($3) RETURNING *";

      const values = [book.author, book.title, id];
      const conn = await client.connect();
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`The book could not be updated ${error}`);
    }
  }

  async remove(id: string): Promise<Book> {
    try {
      const sql = "DELETE FROM books where id = ($1) RETURNING *";
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete book of id ${id}. Error ${error}`);
    }
  }
}
