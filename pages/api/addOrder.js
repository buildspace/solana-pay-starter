import { GraphQLClient, gql, request } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function makeOrder(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });
  console.log("here's the pastrami", order);

  const query = gql`
  mutation CreateOrder($buyer: String!, $orderID: String!, $itemID: String!, $slug: String!) {
    createOrder(data: {buyer: $buyer, orderID: $orderID, itemID: $itemID, post: {connect: {slug: $buyer}}}) {
      buyer
      orderID
      itemID
    }
  }
`;

const result = await graphQLClient.request(query, {
    buyer: req.body.buyer,
    orderID: req.body.orderID,
    itemID: req.body.itemID,
  });   

  return res.status(200).send(result);
}