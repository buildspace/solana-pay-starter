// This API endpoint will let users POST data to add records and GET to retrieve
import orders from "./orders.json";
import { writeFile } from "fs/promises";

function get(req, res) {
  const { buyer } = req.query;

  // Check if this address has any orders
  const buyerOrders = orders.filter((order) => order.buyer === buyer);
  if (buyerOrders.length === 0) {
    // 204 = successfully processed the request, not returning any content
    res.status(204).send();
  } else {
    res.status(200).json(buyerOrders);
  }
}

async function post(req, res) {
  console.log("Received add order request", req.body);
  // Add new order to orders.json
  try {
    const newOrder = req.body;

    // If this address has not purchased this item, add order to orders.json
    if (!orders.find((order) => order.buyer === newOrder.buyer.toString() && order.itemID === newOrder.itemID)) {
      orders.push(newOrder);
      await writeFile("./pages/api/orders.json", JSON.stringify(orders, null, 2));
      res.status(200).json(orders);
    } else {
      res.status(400).send("Order already exists");
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      get(req, res);
      break;
    case "POST":
      await post(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
}
