import { useState, useEffect } from 'react';
import { Web3Storage } from 'web3.storage';

const useIPFS = (hash, filename) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    setFile(`https://ipfs.io/ipfs/${hash}/${filename}`);
  }, []);

  return file;
};

export default useIPFS;
