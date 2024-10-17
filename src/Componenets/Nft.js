import React, { useState } from 'react';
import { ethers } from 'ethers';
import DataStorage from '../contract/DataStorage.json'; // Adjust path as needed

const CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; // Replace with your deployed contract address

function App() {
  const [data, setData] = useState('');
  const [storedData, setStoredData] = useState('');
  const amount = ethers.utils.parseEther("5")
  async function setDataOnBlockchain() {
    if (!data) return;

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DataStorage.abi, signer);

      try {
        const nonce = await provider.getTransactionCount('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 'latest'); // Fetch the current nonce

        console.log(nonce)

        const tx = await contract.setData(45,'0xdD2FD4581271e230360230F9337D5c0430Bf44C0', { value: amount, gasLimit: 3000000, nonce: nonce });
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
        const result = await contract.retrieveData();
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
      <br></br>
      <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='content text-center'>
            <h1>NFT Number</h1>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Enter data"
            />
            <button onClick={setDataOnBlockchain}>Store Data</button>
            <button onClick={getDataFromBlockchain}>Retrieve Data</button>
            <h2>Stored Data: {storedData}</h2>

          </div></div>

        <div className='col-md-6'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
</div>
    </div>
  );
}

export default App;
