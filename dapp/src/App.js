import './App.css';
import React,{Component, useEffect, useState} from 'react';
import Web3 from 'web3';
import ABI from './abi.json';
import { init, mintToken } from './webClient';
import NavBar from './navbar.js'
import './App.css'; // Import the main CSS file
import './card.css'; // Import the card styles


function App() {
  let contractAddress = "0x0651298b7679027E3AF87d7977EF992670535139";
  const [minted, setMinted] = useState(false);
  const [inputValue,setInput1Value] = useState('');
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [whitelistedAccounts, setWhitelistedAccounts] = useState([]);
  const [amountToMint, setAmountToMint] = useState(0);
  const [toWhitelistAddress, setToWhitelistAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferToAddress, setTransferToAddress] = useState('');

  useEffect (() => {
    init();
  },[])

  useEffect(() => {
    const initWeb3 = async () => {
      // Connect to MetaMask or other Ethereum provider
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          // Get the user's accounts
          const accs = await web3Instance.eth.getAccounts();
          setAccounts(accs);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('No Ethereum provider detected. Install MetaMask.');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const initContract = async () => {
      try {
        // Get the contract instance
        const contractInstance = new web3.eth.Contract(
          ABI.abi,contractAddress 
        );

        setContract(contractInstance);

        // Fetch and set whitelisted accounts
        const whitelisted = await contractInstance.methods.getWhitelistedAccounts().call();
        setWhitelistedAccounts(whitelisted);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    if (web3) {
      initContract();
    }
  }, [web3]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mintToken(inputValue).then((tx) => {
      console.log(tx);
      setMinted(true);
    }).catch((err) => {
      console.log(err);
    });
  };

  const distributeTokens = async () => {
    try {
      await contract.methods.distributeToWhitelist(amountToMint).send({ from: accounts[0] });

      // Update the whitelisted accounts after distribution
      const updatedWhitelisted = await contract.methods.getWhitelistedAccounts().call();
      setWhitelistedAccounts(updatedWhitelisted);
    } catch (error) {
      console.error('Error distributing tokens:', error);
    }
  };

  const whitelistAccount = async () => {
    try {
      await contract.methods.whitelistAccount(toWhitelistAddress).send({ from: accounts[0] });

      // Update the whitelisted accounts after whitelisting
      const updatedWhitelisted = await contract.methods.getWhitelistedAccounts().call();
      setWhitelistedAccounts(updatedWhitelisted);
    } catch (error) {
      console.error('Error whitelisting account:', error);
    }
  };

  const unwhitelistAccount = async () => {
    try {
      await contract.methods.unwhitelistAccount(toWhitelistAddress).send({ from: accounts[0] });

      // Update the whitelisted accounts after unwhitelisting
      const updatedWhitelisted = await contract.methods.getWhitelistedAccounts().call();
      setWhitelistedAccounts(updatedWhitelisted);
    } catch (error) {
      console.error('Error unwhitelisting account:', error);
    }
  };

  const transferTokens = async () => {
    try {
      await contract.methods.transfer(transferToAddress, transferAmount).send({ from: accounts[0] });
    } catch (error) {
      console.error('Error transferring tokens:', error);
    }
  };

  const lockTransfer = async () => {
    try {
      await contract.methods.lockTransfer().send({ from: accounts[0] });
    } catch (error) {
      console.error('Error locking token transfer:', error);
    }
  };

  const unlockTransfer = async () => {
    try {
      await contract.methods.unlockTransfer().send({ from: accounts[0] });
    } catch (error) {
      console.error('Error unlocking token transfer:', error);
    }
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const headingStyle = {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyle = {
    padding: '8px',
    marginRight: '10px',
  };

  const buttonStyle = {
    padding: '10px',
    cursor: 'pointer',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
  };

  const successMessageStyle = {
    color: 'green',
  };
  
  return (
    <div className="App">
      <NavBar accounts={accounts} />
  
      <div className="card">
        <h2 className="cardHeading">Mint Token</h2>
        <div className="cardContent">
          <label className="label">
            Address to Mint:
            <input type="text" className="input" onChange={(e) => setInput1Value(e.target.value)} />
          </label>
        </div>
        {!minted ? (
          <button className="cardButton" onClick={(e) => handleSubmit(e)}>
            Mint token
          </button>
        ) : (
          <p className="success-message">Token minted successfully!</p>
        )}
      </div>
  
      <div className="card">
        <h2 className="cardHeading">Distribute Tokens to Whitelist</h2>
        <div className="cardContent">
          <label className="label">
            Amount to Distribute:
            <input
              type="number"
              className="input"
              value={amountToMint}
              onChange={(e) => setAmountToMint(e.target.value)}
            />
          </label>
        </div>
        <button className="cardButton" onClick={distributeTokens}>
          Distribute Tokens
        </button>
      </div>
  
      <div className="card">
        <h2 className="cardHeading">Whitelist Account</h2>
        <div className="cardContent">
          <label className="label">
            Address to Whitelist:
            <input
              type="text"
              className="input"
              value={toWhitelistAddress}
              onChange={(e) => setToWhitelistAddress(e.target.value)}
            />
          </label>
        </div>
        <button className="cardButton" onClick={whitelistAccount}>
          Whitelist Account
        </button>
      </div>
  
      <div className="card">
        <h2 className="cardHeading">Unwhitelist Account</h2>
        <div className="cardContent">
          <label className="label">
            Address to Unwhitelist:
            <input
              type="text"
              className="input"
              value={toWhitelistAddress}
              onChange={(e) => setToWhitelistAddress(e.target.value)}
            />
          </label>
        </div>
        <button className="cardButton" onClick={unwhitelistAccount}>
          Unwhitelist Account
        </button>
      </div>
  
      <div className="card">
        <h2 className="cardHeading">Transfer Tokens</h2>
        <div className="cardContent">
          <label className="label">
            To Address:
            <input
              type="text"
              className="input"
              value={transferToAddress}
              onChange={(e) => setTransferToAddress(e.target.value)}
            />
          </label>
          <label className="label">
            Amount to Transfer:
            <input
              type="number"
              className="input"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </label>
        </div>
        <button className="cardButton" onClick={transferTokens}>
          Transfer Tokens
        </button>
      </div>
  
      <div className="card">
        <h2 className="cardHeading">Lock/Unlock Token Transfer</h2>
        <button className="cardButton" onClick={lockTransfer}>
          Lock Transfer
        </button>
        <button className="cardButton" onClick={unlockTransfer}>
          Unlock Transfer
        </button>
      </div>
    </div>
  );
}
export default App;