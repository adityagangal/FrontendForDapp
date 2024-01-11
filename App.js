import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {
  whitelistAccount,
  unwhitelistAccount,
  getWhitelistedAccounts,
  distributeToWhitelist,
  lockTransfer,
  unlockTransfer,
} from './api'; // Import API functions

const App = () => {
  const [senderAddress, setSenderAddress] = useState('');
  const [whitelistedAccounts, setWhitelistedAccounts] = useState([]);
  const [whitelistAccountAddress, setWhitelistAccountAddress] = useState('');
  const [unwhitelistAccountAddress, setUnwhitelistAccountAddress] = useState('');
  const [amountToDistribute, setAmountToDistribute] = useState('');

  // Fetch whitelisted accounts on component mount
  useEffect(() => {
    const fetchWhitelistedAccounts = async () => {
      try {
        const response = await getWhitelistedAccounts();
        setWhitelistedAccounts(response.whitelistedAccounts);
      } catch (error) {
        console.error('Error fetching whitelisted accounts:', error);
      }
    };

    fetchWhitelistedAccounts();
  }, []);

  const handleWhitelistAccount = async () => {
    try {
      const response = await whitelistAccount(senderAddress, whitelistAccountAddress);
      console.log('Transaction Hash:', response.transactionHash);
    } catch (error) {
      console.error('Error whitelisting account:', error);
    }
  };

  const handleUnwhitelistAccount = async () => {
    try {
      const response = await unwhitelistAccount(senderAddress, unwhitelistAccountAddress);
      console.log('Transaction Hash:', response.transactionHash);
    } catch (error) {
      console.error('Error unwhitelisting account:', error);
    }
  };

  const handleDistributeToWhitelist = async () => {
    try {
      const response = await distributeToWhitelist(senderAddress, amountToDistribute);
      console.log('Transaction Hash:', response.transactionHash);
    } catch (error) {
      console.error('Error distributing tokens:', error);
    }
  };

  const handleLockTransfer = async () => {
    try {
      const response = await lockTransfer(senderAddress);
      console.log('Transaction Hash:', response.transactionHash);
    } catch (error) {
      console.error('Error locking transfers:', error);
    }
  };

  const handleUnlockTransfer = async () => {
    try {
      const response = await unlockTransfer(senderAddress);
      console.log('Transaction Hash:', response.transactionHash);
    } catch (error) {
      console.error('Error unlocking transfers:', error);
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
              <Form.Control
                type="text"
                placeholder="Enter account address"
                value={whitelistAccountAddress}
                onChange={(e) => setWhitelistAccountAddress(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleWhitelistAccount}>
              Whitelist Account
            </Button>
          </Form>
        </Col>

        <Col>
          <h2>Unwhitelist Account</h2>
          <Form>
            <Form.Group controlId="unwhitelistAccountAddress">
              <Form.Label>Account to Unwhitelist</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account address"
                value={unwhitelistAccountAddress}
                onChange={(e) => setUnwhitelistAccountAddress(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUnwhitelistAccount}>
              Unwhitelist Account
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Get Whitelisted Accounts</h2>
          <ul>
            {whitelistedAccounts.map((account) => (
              <li key={account}>{account}</li>
            ))}
          </ul>
        </Col>

        <Col>
          <h2>Distribute to Whitelist</h2>
          <Form>
            <Form.Group controlId="amountToDistribute">
              <Form.Label>Amount to Distribute</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amountToDistribute}
                onChange={(e) => setAmountToDistribute(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleDistributeToWhitelist}>
              Distribute to Whitelist
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Lock Transfer</h2>
          <Button variant="primary" onClick={handleLockTransfer}>
            Lock Transfer
          </Button>
        </Col>

        <Col>
          <h2>Unlock Transfer</h2>
          <Button variant="primary" onClick={handleUnlockTransfer}>
            Unlock Transfer
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
