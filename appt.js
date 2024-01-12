import './App.css';
import React,{useEffect, useState} from 'react';
import Web3 from 'web3';
import ABI from './WhitelistedToken.json';
import { init, mintToken } from './WebClient';

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
  
  return (
    <div className="App">
      <h1>Whitelisted Token DApp</h1>
      <p>Connected Account: {accounts[0]}</p>

      <div>
        <h2>Whitelisted Accounts</h2>
        <ul>
          {whitelistedAccounts.map((account, index) => (
            <li key={index}>{account}</li>
          ))}
        </ul>
      </div>
      <h1>Whitelisted Token DApp</h1>
      <p>Connected Account: {accounts[0]}</p>

      <input type="text" id='address' onChange={(e) => setInput1Value(e.target.value)}/>
      {!minted ? (
        <button onClick={(e) => handleSubmit(e)}>Mint token</button>
      ) : (
        <p>Token minted successfully!</p>
      )}

      <div>
        <h2>Distribute Tokens to Whitelist</h2>
        <label>
          Amount to Distribute:
          <input
            type="number"
            value={amountToMint}
            onChange={(e) => setAmountToMint(e.target.value)}
          />
        </label>
        <button onClick={distributeTokens}>Distribute Tokens</button>
      </div>

      <div>
        <h2>Whitelist Account</h2>
        <label>
          Address to Whitelist:
          <input
            type="text"
            value={toWhitelistAddress}
            onChange={(e) => setToWhitelistAddress(e.target.value)}
          />
        </label>
        <button onClick={whitelistAccount}>Whitelist Account</button>
      </div>

      <div>
        <h2>Unwhitelist Account</h2>
        <label>
          Address to Unwhitelist:
          <input
            type="text"
            value={toWhitelistAddress}
            onChange={(e) => setToWhitelistAddress(e.target.value)}
          />
        </label>
        <button onClick={unwhitelistAccount}>Unwhitelist Account</button>
      </div>
      <div>
        <h2>Transfer Tokens</h2>
        <label>
          To Address:
          <input
            type="text"
            value={transferToAddress}
            onChange={(e) => setTransferToAddress(e.target.value)}
          />
        </label>
        <label>
          Amount to Transfer:
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
        </label>
        <button onClick={transferTokens}>Transfer Tokens</button>
      </div>

      <div>
        <h2>Lock/Unlock Token Transfer</h2>
        <button onClick={lockTransfer}>Lock Transfer</button>
        <button onClick={unlockTransfer}>Unlock Transfer</button>
      </div>  
    </div>
  );
}

export default App;