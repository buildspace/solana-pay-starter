import { request, gql, GraphQLClient } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const GRAPHCMS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTM3NDAxODcsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NsM3B1N2Y1bzdtdTMwMXhpMmU4ZjRpejAvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMzhmODYyNGUtNjg1ZS00NjUxLWJmNTUtOGNjOWNhYmFiZjYzIiwianRpIjoiY2tnODM1b2FwcjRmaTAxd2U5OGpsNzgwdCJ9.5QDa_TIFSY7bphgOX1GCCFU7htlgs8zsYuun9ciHoEp8JWL3S6_7Ry7fDUeQcV-1cZ00HR5i-jKkeKxvXELKVPJaq5uokIO3RlFCd3OiPrx9AypWtJvycsE0K3bPlSH53yYR69B6N8P6l3FcbG-X43yoQkU2hUVxunUox9wOYXacNsqNFUPOlXbKemw2VDyamKXALl_tyElZ5omf2_KkSrRchYIH51l8GfWAWrq7iC0FjxlUay0w578Up-g4mHBthxkHiJZHXfFkMahGhYJJW2CsRUy72VLm35w5UQHuGEuvB-HLni_XmMhH-1paHxmwYDZrqLUJJ7zdJH_vV4jSFSlcEeQlTj9R_ZtPb78dS7taE-mRJ0gJ3YXccJfnMo7n3piIYHH0MRLmKCioqdAD96xRNrmJfq00XCYouJkfHaOZH-wFab0l9_PhHjsg2JGqcIh7KnrQYuDRbZqdj83xaUa4ndzsMGfJ3-4CDxhc_t8hl_Fh2xIsSNUUx7CMMRZTluHkWwm6BF8jGEqS7hyjjOlEEKPXwLrIUbzxjj9Lpfo4C4vxT_m_ntbOVAUKs1I0TExOVDK1E1MSBRF5Yj8rJwe9QUukoc25RM4pDOTL9YyrkXe2PdozCGnUigv9xHEZl8VcIIPo0sEoKh7l6vndpCeo0AJAVJYh9LA9rQWBGLw';

// Before we add the new order we need to query the existing itemID's in the DB and add them to the update if they exist
export const addOrder = async (order, req, res) => {
  const buyer = order.buyer;
  
  console.log("here's the pastrami", order);
  const graphQLClient = new GraphQLClient((graphqlAPI), {
      headers: {
      authorization: `Bearer ${GRAPHCMS_TOKEN}`,
    },
  });

    var query = gql`
      query GetOrders($buyer:String!) {
      orders(where: {buyer: $buyer}){
        itemID
      }
    } 
    `;
  

  var pastrami = await request(graphqlAPI, query, { buyer }, itemID);
  
  //conditional variable of prexisting id's
  console.log("pastrami", pastrami);
  if (pastrami.orders >= 1) { 
    var itemIDs = pastrami.orders[0].itemID;
  } else { 
    var itemIDs = [];
  };
  console.log("current itemIDS are: ", itemIDs);
  itemIDs.push(order.itemID);
  console.log("itemIDs", itemIDs);
  
  //set constants for GQL mutation
  const orderID = order.orderID;
  const itemID = itemIDs;
  const slug = buyer.toLowerCase();

  var query = gql`
    mutation UpsertOrder($buyer: String!, $orderID: String!, $itemID: [Int!], $slug: String!) {
      upsertOrder(
        where: {slug: $slug}
        upsert: {
          create: {buyer: $buyer, orderID: [$orderID], itemID: $itemID, slug: $slug},
          update: {buyer: $buyer, orderID: [$orderID], itemID: $itemID}
          }
        ) 
      { 
        buyer
        orderID
        itemID
        slug
       }
      publishOrder(where: {slug: $slug}){
        buyer
        orderID
        itemID
        slug
      }   
    }
  `;

  const result = await graphQLClient.request(query, {
    buyer: buyer,
    orderID: orderID,
    itemID: itemID,
    slug: slug
  });
  // oldOrders.push(pastrami.itemID);
  return console.log("your order has been added: ", result);
}

// Returns true if a given public key has purchased an item before
export const hasPurchased = async (publicKey, itemID) => {
  // Send a GET request with the public key as a parameter
  const response = await fetch(`../api/orders?buyer=${publicKey.toString()}`);
  // If response code is 200
  if (response.status === 200) {
    const json = await response;
    console.log("Current wallet's orders are:", json);
    // If orders is not empty
    if (json.length > 0) {
      // Check if there are any records with this buyer and item ID
      const order = json.find((order) => order.itemID === product.id);
      console.log("this is the order", order)
      if (order) {
        return true;
      }
    }
  }
  return false;
};

export const fetchItem = async (itemID) => {
  const response = await fetch("../api/fetchItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemID }),
  });
  const item = await response.json();
  return item;
}
