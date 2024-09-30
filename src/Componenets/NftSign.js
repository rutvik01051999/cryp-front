// import React, { useRef, useState } from 'react';
// import SignatureCanvas from 'react-signature-canvas';

// function NftSign() {
//   const [imageURL, setImageURL] = useState(null); // to store image URL
//   const sigCanvas = useRef({});

//   // Clear the signature canvas
//   const clear = () => sigCanvas.current.clear();

//   // Save the signature
//   const save = () => {
//     const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
//     console.log(signatureData)
//     setImageURL(signatureData); // Save the signature as a URL
//   };

//   return (
//     <div className="App">
//       <h1>Sign Below</h1>
      
//       {/* Signature Canvas */}
//       <SignatureCanvas
//         ref={sigCanvas}
//         penColor="black"
//         canvasProps={{
//           width: 500,
//           height: 200,
//           className: 'sigCanvas'
//         }}
//       />

//       {/* Buttons */}
//       <button onClick={clear}>Clear</button>
//       <button onClick={save}>Save</button>

//       {/* Display the saved signature image */}
//       {imageURL ? (
//         <div>
//           <h2>Saved Signature:</h2>
//           <img src={imageURL} alt="signature" />
//         </div>
//       ) : null}
//     </div>
//   );
// }

// export default NftSign;


import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ImageStorageABI from '../contract/DataStorage.json'; // Adjust path as needed

function NftSign() {
    const [imageHash, setImageHash] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImageHash, setUploadedImageHash] = useState('');
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your contract address

    // Handle image file change
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Upload image to IPFS
    const uploadImageToIPFS = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                const hash = data.Hash;
                setUploadedImageHash(hash);
                console.log('Image uploaded to IPFS:', hash);
                return hash;
            } catch (err) {
                console.error('Error uploading to IPFS:', err);
            }
        }
    };

    // Store IPFS hash on the blockchain
    const storeImageHashOnBlockchain = async (hash) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ImageStorageABI.abi, signer);
            try {
                const tx = await contract.setImageHash(hash);
                await tx.wait();
                console.log('IPFS hash stored on blockchain:', hash);
                getImageHashFromBlockchain();
            } catch (err) {
                console.error('Error storing hash on blockchain:', err);
            }
        }
    };

    // Retrieve the IPFS hash from the blockchain
    const getImageHashFromBlockchain = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, ImageStorageABI.abi, provider);
            try {
                const hash = await contract.getImageHash();
                setImageHash(hash);
            } catch (err) {
                console.error('Error retrieving hash from blockchain:', err);
            }
        }
    };

    const handleUpload = async () => {
        const hash = await uploadImageToIPFS();
        if (hash) {
            await storeImageHashOnBlockchain(hash);
        }
    };

    useEffect(() => {
        getImageHashFromBlockchain();
    }, []);

    return (
        <div>
            <h1>Upload and Store Image on Blockchain</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload and Store</button>
            <p>Stored IPFS Hash: {imageHash}</p>
            {imageHash && <img src={`https://ipfs.infura.io/ipfs/${imageHash}`} alt="Stored" />}
        </div>
    );
}

export default NftSign;
