import React, { useState, useEffect, useMemo } from "react";
import { Keypair, Transaction } from "@solana/web3.js";
import { findReference, FindReferenceError } from "@solana/pay";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ThreeDots } from "react-loader-spinner";
import IPFSDownload from "./IpfsDownload";
import { addOrder, fetchItem, hasPurchased } from "../lib/api";

const STATUS = {
  Initial: "Initial",
  Submitted: "Submitted",
  Paid: "Paid",
};

export default function Buy({ itemID }) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const orderID = useMemo(() => Keypair.generate().publicKey, []); // Public key used to identify the order

  const [item, setItem] = useState(null); // IPFS hash & filename of the purchased item
  const [loading, setLoading] = useState(true); // Loading state of all above
  const [status, setStatus] = useState(STATUS.Initial); // Tracking transaction status

  // useMemo is a React hook that only computes the value if the dependencies change
  const order = useMemo(
    () => ({
      buyer: publicKey.toString(),
      orderID: orderID.toString(),
      itemID: itemID,
    }),
    [publicKey, orderID, itemID]
  );

  // Fetch the transaction object from the server
  const processTransaction = async () => {
    setLoading(true);
    try {
      const txResponse = await fetch("../api/createTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      console.log(txResponse);
      const txData = await txResponse.json();

      // We create a transaction object
      const tx = Transaction.from(Buffer.from(txData.transaction, "base64"));
      console.log("Tx data is", tx);

      // Attempt to send the transaction to the network
      // Send the transaction to the network
      const txHash = await sendTransaction(tx, connection);
      console.log(`Transaction sent: https://solscan.io/tx/${txHash}?cluster=devnet`);
      setStatus(STATUS.Submitted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if this address already has already purchased this item
    // If so, fetch the item and set paid to true
    // Async function to avoid blocking the UI
    async function checkPurchased() {
      setLoading(true);
      const purchased = await hasPurchased(publicKey, itemID);
      if (purchased) {
        getItem(itemID);
      }
      setLoading(false);
    }
    checkPurchased();
  }, [publicKey, itemID]);

  useEffect(() => {
    // Check if transaction was confirmed
    if (status === STATUS.Submitted) {
      setLoading(true);
      const interval = setInterval(async () => {
        try {
          const result = await findReference(connection, orderID);
          console.log("Finding tx reference", result.confirmationStatus);
          if (result.confirmationStatus === "confirmed" || result.confirmationStatus === "finalized") {
            clearInterval(interval);
            addOrder(order);
            getItem(itemID);
            // alert('Thank you for your purchase!');
          }
        } catch (e) {
          if (e instanceof FindReferenceError) {
            return null;
          }
          console.error("Unknown error", e);
        } finally {
          setLoading(false);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [status]);

  async function getItem(itemID) {
    setStatus(STATUS.Paid);
    const item = await fetchItem(itemID);
    setItem(item);
  }

  if (!publicKey) {
    return (
      <div>
        <p>You need to connect your wallet to make transactions</p>
      </div>
    );
  } else if (loading || (status === STATUS.Paid && !item)) {
    return <ThreeDots color="#4664ff" height={45} width={80} />;
  } else {
    return (
      <div>
        {item ? (
          <IPFSDownload hash={item.hash} filename={item.filename} />
        ) : (
          <button className="buy-button" onClick={processTransaction}>
            Buy now 🠚
          </button>
        )}
      </div>
    );
  }
}
