import React, { useEffect, useState } from 'react';
import { useWallet } from './wallet-context';

const WalletConnect = () => {
  const {
    account,
    connectMetaMask,
    connectExodus,
    connectPhantom,
    phantomAddress,
    metaMaskAddress,
    exodusAddress = (params) => {},
  } = useWallet();

  const handleConnectMetaMask = async () => {
    await connectMetaMask();
  };

  const handleConnectPhantom = async () => {
    await connectPhantom();
  };

  const handleConnectExodus = async () => {
    await connectExodus();
  };

  const formatAccount = (account) => {
    if (!account) return null;
    return `${account.slice(0, 5)}...${account.slice(-5)}`;
  };

  useEffect(() => {
    if (account) {
      console.log('Account connected:', account);
    }
  }, [account]);

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handleConnectMetaMask}>
        {metaMaskAddress ? formatAccount(metaMaskAddress) : 'Connect MetaMask'}
      </button>
      <button style={styles.button} onClick={handleConnectPhantom}>
        {phantomAddress ? formatAccount(phantomAddress) : 'Connect Phantom'}
      </button>
      <button style={styles.button} onClick={handleConnectExodus}>
        {exodusAddress ? formatAccount(exodusAddress) : 'Connect Exodus'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
  },
};

export default WalletConnect;
