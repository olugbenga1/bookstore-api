import express, { Request, Response } from "express";
import verifyAuthToken from "../middlewares/auth";
import { BookStore, Book } from "../models/book";

const store = new BookStore();

const index = async (req: Request, res: Response) => {
  try {
    const books = await store.index();
    res.json(books);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newBook: Book = payload;
    const book = await store.create(newBook);
    res.json(book);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await store.show(id);
    res.json(book);
  } catch (error) {
    console.log("kkk", error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const book: Book = payload;
    const updatedBook = await store.update(id, book);
    res.json(updatedBook);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await store.remove(id);
    res.json(book);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const book_routes = (app: express.Application) => {
  app.get("/books", verifyAuthToken, index);
  app.post("/books", verifyAuthToken, create);
  app.get("/books/:id", verifyAuthToken, show);
  app.put("/books/:id", verifyAuthToken, update);
  app.delete("/books/:id", verifyAuthToken, remove);
};

export default book_routes;
