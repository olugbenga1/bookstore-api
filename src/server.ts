import express from "express";
import bodyParser from "body-parser";
import book_routes from "./handlers/book";
import user_routes from "./handlers/user";
import order_routes from "./handlers/order";

const app: express.Application = express();
const address: string = "0.0.0.0:5000";

app.use(bodyParser.json());

book_routes(app);
user_routes(app);
order_routes(app);

app.listen(5000, function () {
  console.log(`starting app on: ${address}`);
});
