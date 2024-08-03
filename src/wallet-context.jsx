import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';

// Create a context for the wallet
const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [metaMaskAddress, setMetaMaskAddress] = useState(null);
  const [phantomAddress, setPhantomAddress] = useState(null);
  const [exodusAddress, setExodusAddress] = useState(null);

  const disconnectWallet = () => {
    setProvider(null);
    setWallet(null);
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      if (window.ethereum.isMetaMask) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const accounts = await provider.send('eth_requestAccounts', []);
          setProvider(provider);
          setMetaMaskAddress(accounts[0]);
          setWallet('MetaMask');
          localStorage.setItem('selectedWallet', accounts[0]);
          console.log('MetaMask connected:', accounts[0]);
        } catch (error) {
          console.error('Failed to connect MetaMask:', error);
          // Provide user feedback here, e.g., UI notification
        }
      } else {
        console.error('Ethereum provider is not MetaMask');
        // Provide user feedback here
      }
    } else {
      console.error('MetaMask is not installed');
      // Provide user feedback here
    }
  };

  const connectExodus = async () => {
    if (!window.exodus) {
      alert('Exodus is not installed. Please install it to continue.');
      return;
    }
    try {
      const provider = new BrowserProvider(window.exodus.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setProvider(provider);
      setExodusAddress(accounts[0]);
      setWallet('Exodus');
    } catch (error) {
      console.error('Failed to connect Exodus:', error);
    }
  };

  const connectPhantom = async () => {
    const isPhantomInstalled = window.phantom?.solana?.isPhantom;

    if (!isPhantomInstalled) {
      alert('Phantom is not installed. Please install it to continue.');
      return;
    }
    try {
      const response = await window.phantom.solana.connect();
      setPhantomAddress(response.publicKey.toString());
      setWallet('Phantom');
      localStorage.setItem('selectedWallet', response.publicKey.toString());
    } catch (error) {
      console.error('Failed to connect Phantom:', error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        provider,
        wallet,
        connectMetaMask,
        connectExodus,
        connectPhantom,
        metaMaskAddress,
        phantomAddress,
        exodusAddress,
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
