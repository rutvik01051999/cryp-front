import React, { useState } from 'react';
import { ethers } from 'ethers';
import DataStorage from '../contract/DataStorage.json'; // Adjust path as needed

const CONTRACT_ADDRESS = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'; // Replace with your deployed contract address

function App() {
  const [data, setData] = useState('');
  const [storedData, setStoredData] = useState('');

  async function setDataOnBlockchain() {
    if (!data) return;

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DataStorage.abi, signer);

      try {
        // const tx = await contract.setData(data);
        const tx = await signer.sendTransaction({
            to: CONTRACT_ADDRESS,                     // The recipient address
            value: 120000000000000,  // Amount of Ether to send in Wei
          });
        await tx.wait();
        alert('Data stored successfully!');
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  }

  async function getDataFromBlockchain() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DataStorage.abi, provider);

      try {
        const result = await contract.getData();
        setStoredData(result);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <h1>Data Storage DApp</h1>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter data"
      />
      <button onClick={setDataOnBlockchain}>Store Data</button>
      <button onClick={getDataFromBlockchain}>Retrieve Data</button>
      <h2>Stored Data: {storedData}</h2>
    </div>
  );
}

export default App;
