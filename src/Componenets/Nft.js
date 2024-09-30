import React, { useState } from 'react';
import { ethers } from 'ethers';
import DataStorage from '../contract/DataStorage.json'; // Adjust path as needed

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your deployed contract address

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
        const tx = await contract.setData(data);
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
      console.log(window.ethereum)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DataStorage.abi, provider);
      console.log('enter2')

      try {
        console.log('enter3')
        const result = await contract.retrieveData({ gasLimit: 3000000 });
        console.log('data', result)
        setStoredData(result.toString());
        console.log('enter7')
        // setStoredData(result);
        console.log('enter77')
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
