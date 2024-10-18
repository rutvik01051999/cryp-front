import React, { useState } from "react";
import axios from "axios";
import { ethers } from 'ethers';
import ImageStorage from '../contract/ImageStorage.json'; // Adjust path as needed

const CONTRACT_ADDRESS = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'; // Replace with your deployed contract address


const NftSign = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState("");


    //store hash value in block chian 


    async function setDataOnBlockchain(hash) {
    
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, ImageStorage.abi, signer);
    
          try {
            const tx = await contract.setString(hash);
            // const tx = await contract.setData(data,CONTRACT_ADDRESS);
            await tx.wait();
            alert('Data stored successfully!');
          } catch (error) {
            console.error(error);
          }
        } else {
          alert('Please install MetaMask!');
        }
      }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadToPinata = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        const metadata = JSON.stringify({
            name: "MyImage",
        });
        formData.append("pinataMetadata", metadata);

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", pinataOptions);

        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                        pinata_api_key: "c3b87ecde64af10f6a43",
                        pinata_secret_api_key: "6c1905aec9afc723a77c97c9a5600ffe4d01e86f4426759287950e9557560e61",
                    },
                }
            );

            console.log("IPFS Hash: ", res.data.IpfsHash);
            setIpfsHash(res.data.IpfsHash);
            setDataOnBlockchain(res.data.IpfsHash);
        } catch (error) {
            console.error("Error uploading to Pinata: ", error);
            alert("Error uploading file!");
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 ">
                        <br></br>
                        <h1>Mint Nft</h1>
                        <form onSubmit={uploadToPinata} className="text-center">
                            <input type="file" onChange={handleFileChange} />
                            <br></br><br></br>
                            <button type="submit" className="text-center">Mint</button>
                        </form>

                        {ipfsHash && (
                            <div>
                                <p>Image successfully uploaded!</p>
                                <p>IPFS Hash: {ipfsHash}</p>
                                <a
                                    href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Image
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="col-md-6 text-center">
                        <br></br>
                        <h1>My Nfts</h1>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NftSign;
