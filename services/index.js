import { request, gql } from 'graphql-request';
// import Product from '../components/Product';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


export const addOrder = async (obj) => {
    const result = await fetch(makeOrder(obj), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  
    return result.json();
};
  
//Will display the current wallet's orders in console if you hit direct API /api/orders/buyer?=....
export const getOrders = async (buyer) => {
  const query = gql`
    query GetOrders($buyer:String!) {
      orders(where: {buyer: $buyer}){
        orderID
        itemID
    }
  }
  `;

  const result = await request(graphqlAPI, query, { buyer });
  return result.orders;
};

export const hasPurchased = async (publicKey, itemID) => {
  const buyer = publicKey.toString();
  const query = gql`
    query GetOrders($buyer:String!) {
      orders(where: {buyer: $buyer}){
        itemID
    }
  } 
  `;

  const result = await request(graphqlAPI, query, { buyer }, itemID);
  
  if (result.orders.length > 0 && result.orders[0].itemID.includes(itemID))  { 
      console.log("currnt wallets orders are: ", result.orders[0].itemID);
      console.log("order is: ", itemID);
      return true; 
    }
  return false;
};