import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ethers } from 'ethers';

type NetworkOption = 'mainnet' | 'sepolia' | 'goerli';

const NETWORKS: Record<NetworkOption, number> = {
  mainnet: 1,
  sepolia: 11155111,
  goerli: 5,
};

const CHAIN_PARAMS: Record<NetworkOption, any> = {
  mainnet: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://etherscan.io'],
  },
  sepolia: {
    chainId: '0xaa36a7',
    chainName: 'Sepolia Test Network',
    rpcUrls: ['https://rpc.sepolia.org'],
    nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
  goerli: {
    chainId: '0x5',
    chainName: 'Goerli Test Network',
    rpcUrls: ['https://ethereum-goerli.publicnode.com'], // a working public Goerli endpoint (for now)
    nativeCurrency: { name: 'GoerliETH', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
};

type WalletContextType = {
  provider: ethers.BrowserProvider | null;
  address: string | null;
  network: NetworkOption;
  switchNetwork: (network: NetworkOption) => Promise<void>;
  connect: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType>({
  provider: null,
  address: null,
  network: 'mainnet',
  switchNetwork: async () => {},
  connect: async () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<NetworkOption>('mainnet');

  const connect = async () => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await newProvider.getSigner();
      const addr = await signer.getAddress();
      setProvider(newProvider);
      setAddress(addr);
    } else {
      alert('Please install MetaMask!');
    }
  };

  const switchNetwork = async (selected: NetworkOption) => {
    if (!window.ethereum) return;
    const chainIdHex = '0x' + NETWORKS[selected].toString(16);
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
      setNetwork(selected);
      connect();
    } catch (err: any) {
      // 4902 is error code for "Unrecognized chain"
      if (
        err.code === 4902 ||
        (err.data &&
          err.data.originalError &&
          err.data.originalError.code === 4902)
      ) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [CHAIN_PARAMS[selected]],
          });
          setNetwork(selected);
          connect();
        } catch (addErr: any) {
          alert('Failed to add network: ' + addErr.message);
        }
      } else {
        alert('Network switch failed: ' + err.message);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{ provider, address, network, switchNetwork, connect }}
    >
      {children}
    </WalletContext.Provider>
  );
};
