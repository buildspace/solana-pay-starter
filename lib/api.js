export const addOrder = async (order) => {
    console.log("adding order ", order, "To DB");
    await fetch("../api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
};

// Returns true if a given public key has purchased an item before
export const hasPurchased = async (publicKey, itemID) => {
  // Send a GET request with the public key as a parameter
  const response = await fetch(`../api/orders?buyer=${publicKey.toString()}`);
  // If response code is 200
  if (response.status === 200) {
    const json = await response.json();
    console.log("Current wallet's orders are:", json);
    // If orders is not empty
    if (json.length > 0) {
      // Check if there are any records with this buyer and item ID
      const order = json.find((order) => order.buyer === publicKey.toString() && order.itemID === itemID);
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