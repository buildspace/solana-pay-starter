import { GraphQLClient, gql } from 'graphql-request';
import { getOrders } from '../../services';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
// export default async function asynchandler(req, res) {
//   const graphQLClient = new GraphQLClient((graphqlAPI), {
//     headers: {
//       authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
//     },
//   });

//   const query = gql`
//     mutation CreateOrder($buyer: String!, $orderID: String!, $itemID: Int!) {
//       createOrder(data: {buyer: $buyer, orderID: $orderID, itemID: $itemID}) { id }
//     }
//   `;

//   const result = await graphQLClient.request(query, {
//     buyer: req.body.buyer,
//     orderID: req.body.orderID,
//     itemID: req.body.itemID,
//   });

//   return res.status(200).send(result);
// }

// *****************

async function post(req, res) {
    console.log("Received add order request", req.body);
    // Add new order to orders.json
    try {
      const newOrder = req.body;
      console.log("THIS IS THE REQ", req.body);

      const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
          authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
      });

      // If this address has not purchased this item, add order to orders.json
      if (!orders.find((order) => order.buyer === newOrder.buyer.toString() && order.itemID === newOrder.itemID)) {
        
        const query = gql`
        mutation CreateOrder($buyer: String!, $orderID: String!, $itemID: String!) {
          createOrder(data: {buyer: $buyer, orderID: $orderID, itemID: $itemID}) { id }
        }
      `;
        
          const result = await graphQLClient.request(query, {
            buyer: req.body.buyer,
            orderID: req.body.orderID,
            itemID: req.body.itemID,
          });

          return res.status(200).send(result);
      } else {
        res.status(400).send("Order already exists");
      }
    } catch (err) {
      res.status(400).send(err);
    }
}

// function get(req, res) {
//     const { buyer } = req.query;

//     // Check if this address has any orders
//     const buyerOrders =   (buyer);
    
//     if (buyerOrders.length === 0) {
//       // 204 = successfully processed the request, not returning any content
//       res.status(204).send();
      
//     } else {
//       res.status(200).json(buyerOrders);
//       console.log("here are order returns", getOrders(buyer));
//     }
// }

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