import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserStore, User } from "../models/user";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await store.show(id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const authenticatedUser = await store.authenticate(
      req.body.username,
      req.body.password
    );
    const token = jwt.sign(
      { user: authenticatedUser },
      process.env.TOKEN_SECRET!
    );
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const decoded = jwt.verify(token!, process.env.TOKEN_SECRET!);
    next();
  } catch (error) {
    res.json(401);
    res.json(error);
  }
};

const user_routes = (app: express.Application) => {
  app.get("/book/users", index);
  app.get("/book/users/:id", show);
  app.post("/book/users", verifyAuthToken, create);
  app.post("/book/login", authenticate);
};

export default user_routes;
