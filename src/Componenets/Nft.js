import React, { useState } from 'react';
import { ethers } from 'ethers';
import DataStorage from '../contract/DataStorage.json'; // Adjust path as needed

const CONTRACT_ADDRESS = '0x95BEf2BBc9953C90701396564e49c33247AE2646'; // Replace with your deployed contract address

function App() {
  const [data, setData] = useState('');
  const [storedData, setStoredData] = useState('');
  const amount = ethers.utils.parseEther("0.00000000000000012") 
  async function setDataOnBlockchain() {
    if (!data) return;

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DataStorage.abi, signer);

      try {
        console.log(amount)                
        const tx = await contract.setData('0x655dAaAD191eeaE30C45148f2AFFbE5256Ea24Dc', { value: amount,gasLimit: 300000 });
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

  async function getDataFromBlockchain() {
    if (window.ethereum) {
      console.log(window.ethereum)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DataStorage.abi, provider);
      console.log('enter2')

      try {
        console.log('enter3')
        const result = await contract.retrieveData({ gasLimit: 300000000 });
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
