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


    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const [nfts, setNfts] = useState([]);

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

                        <div className="nft-gallery">
                            {nfts.map((nft, index) => (
                                <div key={index} className="nft">
                             
                                    <img src={nft.tokenUri['raw']} alt="IPFS Image" style={{ maxWidth: '100%', height: 'auto' }} />

                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}


export default NftSign;
