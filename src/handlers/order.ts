import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json("Cannot fetch all orders");
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await store.show(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json("Cannot get order");
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body;
    const newOrder = await store.create(order);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json("Cannot get new order");
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const removeOrder = await store.remove(id);
    res.status(200).json(removeOrder);
  } catch (error) {
    res.status(400).json("Cannot delete order");
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
  app.delete("/orders/:id", remove);
};

export default order_routes;
