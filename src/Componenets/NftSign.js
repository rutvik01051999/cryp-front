import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import ImageStorage from '../contract/ImageStorage.json'; // Adjust path as needed
import axios from 'axios';

const contractAddress = '0x13D5D22bbF6356BA8efCd7CC4F543aa4aa13E88E'; // Replace with your deployed contract address

const ALCHEMY_API_KEY = 'IL8NMntyVlpwro5pi0J1gm1ORMNmQYMi';
const WALLET_ADDRESS = '0xDff8af062dffEEBaEBE88066FF1b1045070372a1';
const NETWORK = 'sepolia'; // Or 'rinkeby', 'mainnet', etc.

function NftSign() {
    const [tokenURI, setTokenURI] = useState('');
    const [mintedTokenId, setMintedTokenId] = useState(null);
    const amount = ethers.utils.parseEther("0.00000000000000012")

    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState("");
    const [loading, setLoading] = useState(false);



    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const [nfts, setNfts] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        // Add Pinata metadata and options if needed
        const metadata = JSON.stringify({
            name: "MyImageUpload",
            keyvalues: {
                uploadedBy: "ReactApp",
            },
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
            cidVersion: 1,
        });
        formData.append("pinataOptions", options);

        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: "Infinity", // Important for large files
                headers: {
                    "Content-Type": "multipart/form-data",
                    pinata_api_key: "<YOUR_PINATA_API_KEY>",
                    pinata_secret_api_key: "<YOUR_PINATA_SECRET_API_KEY>",
                },
            });

            setIpfsHash(res.data.IpfsHash); // Get IPFS hash from Pinata response
            alert("Upload successful!");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    // Fetch NFTs
    const fetchNFTs = async () => {
        try {
            const url = `https://eth-${NETWORK}.g.alchemy.com/v2/${ALCHEMY_API_KEY}/getNFTs/?owner=${WALLET_ADDRESS}`;
            const response = await axios.get(url);
            setNfts(response.data.ownedNfts);


            console.log(response.data.ownedNfts)
        } catch (error) {
            console.error("Error fetching NFTs:", error);
        }
    };

    useEffect(() => {
        fetchNFTs();
    }, []);




    async function mintNFT() {
        if (!tokenURI) return;
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ImageStorage.abi, signer);
            try {

                const blockNumber = await provider.getBlockNumber();
                console.log("Block number: ", blockNumber);


                // const tokenURI1 = await contract.tokenURI("0");
                // console.log(tokenURI1);

                const jsonObject = {
                    name: "John Doe",
                    description: 'jijk',
                    image: 'https://copper-objective-quail-316.mypinata.cloud/ipfs/QmRjdbAv92381LWSN99VwKAAsVjxjfoEzqrAAvZLMoMyci'
                };


                const transaction = await contract.mintNFT(signer.getAddress(), 'https://gateway.pinata.cloud/ipfs/QmRjdbAv92381LWSN99VwKAAsVjxjfoEzqrAAvZLMoMyci', { gasLimit: 300000 });
                await transaction.wait();
                console.log('NFT Minted!');
                setMintedTokenId(transaction.hash); // Optionally display the minted token ID
                console.log(tokenURI, 'tockenuri')
            } catch (error) {
                console.log('Error minting NFT:', error);
            }
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Mint NFT</h1>
                        <input
                            onChange={(e) => setTokenURI(e.target.value)}
                            placeholder="Enter token URI"
                            value={tokenURI}
                        />
                        <button onClick={mintNFT}>Mint NFT</button>
                        {mintedTokenId && <p>NFT Minted: {mintedTokenId}</p>}
                    </div>


                    <div className="col-md-6">
                        <h1>My Nft</h1>

                        <div class="card-group">
                        {nfts.map((nft, index) => (
                            <div  key={index} class="card">
                              {nft.tokenUri['raw'] ?
                                        <img src={nft.tokenUri['raw']} alt="IPFS Image" style={{ maxWidth: '100%', height: 'auto' }} /> : ''}
                                    <div class="card-body">
                                       
                                    </div>
                            </div>
                            ))}
                            
                        </div>
                    </div>
                </div>

                <div>
                    <h2>Upload Image to Pinata</h2>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload} disabled={loading}>
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                    {ipfsHash && (
                        <div>
                            <p>IPFS Hash:</p>
                            <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
                                {ipfsHash}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default NftSign;
