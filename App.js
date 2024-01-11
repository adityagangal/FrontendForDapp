import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {
  whitelistAccount,
  unwhitelistAccount,
  //getWhitelistedAccounts,
  distributeToWhitelist,
  lockTransfer,
  unlockTransfer,
} from './api'; // Import API functions

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log('Please install MetaMask');
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log('Connect to MetaMask using the Connect button');
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log('Please install MetaMask');
    }
  };

  const addWalletListener = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      setWalletAddress('');
      console.log('Please install MetaMask');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Whitelist Account</h2>
          <Form>
            <Form.Group controlId="whitelistAccountAddress">
              <Form.Label>Account to Whitelist</Form.Label>
              <Form.Control type="text" placeholder="Enter account address" />
            </Form.Group>
            <Button variant="primary" onClick={whitelistAccount}>
              Whitelist Account
            </Button>
          </Form>
        </Col>

        <Col>
          <h2>Unwhitelist Account</h2>
          <Form>
            <Form.Group controlId="unwhitelistAccountAddress">
              <Form.Label>Account to Unwhitelist</Form.Label>
              <Form.Control type="text" placeholder="Enter account address" />
            </Form.Group>
            <Button variant="primary" onClick={unwhitelistAccount}>
              Unwhitelist Account
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        {/* <Col>
          <h2>Get Whitelisted Accounts</h2>
          <ul>
            {getWhitelistedAccounts().map((account) => (
              <li key={account}>{account}</li>
            ))}
          </ul>
        </Col> */}

        <Col>
          <h2>Distribute to Whitelist</h2>
          <Form>
            <Form.Group controlId="amountToDistribute">
              <Form.Label>Amount to Distribute</Form.Label>
              <Form.Control type="number" placeholder="Enter amount" />
            </Form.Group>
            <Button variant="primary" onClick={distributeToWhitelist}>
              Distribute to Whitelist
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Lock Transfer</h2>
          <Button variant="primary" onClick={lockTransfer}>
            Lock Transfer
          </Button>
        </Col>

        <Col>
          <h2>Unlock Transfer</h2>
          <Button variant="primary" onClick={unlockTransfer}>
            Unlock Transfer
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Wallet Connection</h2>
          <Button variant="primary" onClick={connectWallet}>
            Connect Wallet
          </Button>
          <p>
            {walletAddress &&
              `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
