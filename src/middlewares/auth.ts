import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = <string>authorizationHeader?.split(" ")[1];
    const decoded = jwt.verify(token, <string>process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.json(401);
    res.json(error);
  }
};

export default verifyAuthToken;
