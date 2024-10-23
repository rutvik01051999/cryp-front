import React, { useState } from "react";
import axios from "axios";
import { ethers } from 'ethers';
import ImageStorage from '../contract/ImageStorage.json'; // Adjust path as needed

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your deployed contract address


const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your deployed contract address

function NftSign() {
    const [tokenURI, setTokenURI] = useState('');
    const [mintedTokenId, setMintedTokenId] = useState(null);
    const amount = ethers.utils.parseEther("0.00000000012")


    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }




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


                const tokenURI1 = await contract.tokenURI("0");
                console.log(tokenURI1);

                const jsonObject = {
                    name: "John Doe",
                    description: 'jijk',
                    image: 'https://copper-objective-quail-316.mypinata.cloud/ipfs/QmRjdbAv92381LWSN99VwKAAsVjxjfoEzqrAAvZLMoMyci'
                  };


                const transaction = await contract.mintNFT(signer.getAddress(), jsonObject, { gasLimit: 3000000 });
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
            <h1>Mint NFT</h1>
            <input
                onChange={(e) => setTokenURI(e.target.value)}
                placeholder="Enter token URI"
                value={tokenURI}
            />
            <button onClick={mintNFT}>Mint NFT</button>
            {mintedTokenId && <p>NFT Minted: {mintedTokenId}</p>}
        </div>
    );
}


export default NftSign;
