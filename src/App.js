import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Stage from './components/Stage';
import Details from './components/Details';
import { ethers } from 'ethers';

const iface = new ethers.Interface([
  "function isIssued(uint256) external returns(tuple(string actionType, uint256 time, bytes32 tcHash, string note)[])"
]);

async function getTcHashes(id) {
  try {
    const provider = new ethers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/1SZikQsiTlSm9VJyxhFIsAfEXQ5RvzsB');
    const contractAddress = "0xEE7e817dD47Fb786B620e7030CAeEc5EE730e5AE"
    const encodedData = iface.encodeFunctionData("isIssued", [id]);
    const result = await provider.call({to: contractAddress, data: encodedData});
    let decoded = iface.decodeFunctionResult("isIssued", result);
    return decoded[0];
  } catch (error) {
    console.error("Error retrieving encrypted data:", error);
  }
}

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [details, setDetails] = useState([]);
  const [stages, setStages] = useState([]);
  const [newDetails, setNewDetails] = useState([]); // Additional state to store all details

  // In your App component:

useEffect(() => {
  const fetchData = async () => {
    const id = 0; // Example ID, adjust as necessary
    const data = await getTcHashes(id);
    
    if (data && data.length > 0) {
      const newStages = data.map(item => item.actionType);
      setStages(newStages);

      const allDetails = data.map(item => ([
        { fieldName: 'Action Type', fieldValue: item.actionType },
        //{ fieldName: 'Time', fieldValue: new Date(item.time * 1000).toLocaleString() },
        { fieldName: 'Hash/Etag', fieldValue: ethers.hexlify(item.tcHash) },
        { fieldName: 'Note', fieldValue: item.note }
      ]));
      
      setNewDetails(allDetails);
      
      // Set to the first item's details if available
      setDetails(allDetails[0]);
    }
  };

  fetchData().catch(console.error);
}, []);


  const handleStep = (step) => {
    setActiveStep(step);
    if (newDetails[step]) {
      setDetails(newDetails[step]);
    } else {
      setDetails([]); // Fallback to an empty array to avoid errors
    }
  };

  return (
    <div className="App">
      <div className='Dimuto-Container'>
        <Header />
        <Stage stages={stages} activeStep={activeStep} handleStep={handleStep} />
        <Details details={details} />
      </div>  
    </div>
  );
}

export default App;
