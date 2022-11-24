import React, { useState } from "react";
import { create } from "ipfs-http-client";
import styles from "../styles/CreateProduct.module.css";

const client = create("https://ipfs.infura.io:5001/api/v0");

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image_url: "",
    description: "",
  });
  const [file, setFile] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  //   USE FOR TESTING
  //   function sleep(ms) {
  //     return new Promise(resolve => setTimeout(resolve, ms));
  //  }

  async function onChange(e) {
    setUploaded(false);
    setUploading(true);
    const files = e.target.files;
    try {
      setFile({});
      console.log(files[0]);

      const added = await client.add(files[0]);
      // USE FOR TESTING
      // const added = { path:"test" };
      // await sleep(5000);

      console.log("file added : ", files[0].name, added.path);
      setFile({ filename: files[0].name, hash: added.path });
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setUploaded(true);
      setUploading(false);
    }
  }

  const createProduct = async () => {
    try {
      // Combine product data and file.name
      const product = { ...newProduct, ...file };
      console.log("Sending product to api", product);
      const response = await fetch("../api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Product added!");
      } else {
        alert("Unable to add product: ", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const price = "0.01" + process.env.NEXT_PUBLIC_CURRENCY;

  return (
    <div className={styles.background_blur}>
      <div className={styles.create_product_container}>
        <div className={styles.create_product_form}>
          <header className={styles.header}>
            <h1>Create Product</h1>
          </header>

          <div className={styles.form_container}>
            <input
              className={styles.input}
              type="file"
              accept=".zip,.rar,.7zip"
              placeholder="File"
              disabled={uploading}
              required={uploaded}
              onChange={onChange}
            />
            {/* {file && file.filename && <p className="file-name">{file.filename}</p>} */}
            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="text"
                placeholder="Product Name"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }}
              />
              <input
                className={styles.input}
                type="text"
                placeholder={price}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: e.target.value });
                }}
              />
            </div>

            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="url"
                placeholder="Image URL ex: https://i.imgur.com/rVD8bjt.png"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, image_url: e.target.value });
                }}
              />
            </div>
            <textarea
              className={styles.text_area}
              placeholder="Description here..."
              onChange={(e) => {
                setNewProduct({ ...newProduct, description: e.target.value });
              }}
            />

            <button
              className={styles.button}
              onClick={() => {
                createProduct();
              }}
              disabled={uploading}
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
