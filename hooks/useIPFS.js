const useIPFS = (hash, filename) => {
    return `https://ipfs.io/ipfs/${hash}/${filename}`
};

export default useIPFS;
