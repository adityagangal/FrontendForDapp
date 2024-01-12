import React from 'react';

const NavBar = ({ accounts }) => {
  return (
    <nav style={navStyle}>
      <div style={brandStyle}>
        <h1 style={titleStyle}>Whitelisted Token DApp</h1>
      </div>
      <div style={accountContainerStyle}>
        <p style={accountStyle}>Connected Account: {accounts[0]}</p>
      </div>
    </nav>
  );
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  background: '#333',
  color: '#fff',
};

const brandStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

const titleStyle = {
  margin: 0,
};

const accountContainerStyle = {
  marginLeft: 'auto', // Move to the far right
};

const accountStyle = {
  margin: 0,
};

export default NavBar;
