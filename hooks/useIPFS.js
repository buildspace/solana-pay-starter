<<<<<<< HEAD
import { useState, useEffect } from 'react';

=======
>>>>>>> fe464ae96c99ef068db6c271b78f2cd30d8e8f2b
const useIPFS = (hash, filename) => {
    return `https://ipfs.io/ipfs/${hash}/${filename}`
};

export default useIPFS;
