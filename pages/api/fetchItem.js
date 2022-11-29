// This endpoint will send the user a file hash from IPFS
import products from "./products.json"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { itemID } = req.body;

    if (!itemID) {
      return res.status(400).send('Missing itemID');
    }

    const product = products.find((p) => p.id === itemID);
    
    if (product) {
      const { hash, filename } = product;
      return res.status(200).send({ hash, filename });
    } else {
      return res.status(404).send("Item not found");
    }
  } else {
    return res.status(405).send(`Method ${req.method} not allowed`);
  }
}