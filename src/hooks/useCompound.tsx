import { useEffect, useState } from 'react';
import cTokenAbi from '../abis/cToken.json';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';

// Mainnet and Goerli cToken addresses for demo
const CTOKENS = {
  mainnet: [
    {
      symbol: 'cDAI',
      address: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
      underlying: 'DAI',
      decimals: 8,
    },
    {
      symbol: 'cUSDC',
      address: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
      underlying: 'USDC',
      decimals: 8,
    },
  ],
  goerli: [
    {
      symbol: 'cETH',
      address: '0x41B5844f4680a8C38fBb695b7F9CFd1F64474a72',
      underlying: 'ETH',
      decimals: 8,
    },
    // Add more Goerli cTokens if you want
  ],
  sepolia: [
    // Compound is not usually on Sepolia; skip or add your own addresses if deployed
  ],
};

export function useCompound() {
  const { provider, address, network } = useWallet();
  const [data, setData] = useState<
    { symbol: string; apy: number; supplied: number }[]
  >([]);

useEffect(() => {
  async function fetchCompound() {
    console.log(
      'Provider:',
      provider,
      'Address:',
      address,
      'Network:',
      network,
    );
    if (!provider || !address) {
      setData([]);
      return;
    }
    const tokens = CTOKENS[network] || [];
    const result: { symbol: string; apy: number; supplied: number }[] = [];

for (const token of tokens) {
  try {
    const contract = new ethers.Contract(token.address, cTokenAbi, provider);

    const supplyRatePerBlock = await contract.supplyRatePerBlock();
    const blocksPerYear = 4 * 60 * 24 * 365;
    const rate = Number(supplyRatePerBlock) / 1e18;
    const apy = (Math.pow(rate * blocksPerYear + 1, 1) - 1) * 100;

    const balanceRaw = await contract.balanceOf(address);
    const supplied = Number(balanceRaw) / 10 ** token.decimals;

    result.push({
      symbol: token.symbol,
      apy,
      supplied,
    });
  } catch (err) {
    console.error("Compound fetch error for", token.symbol, err);
    continue;
  }


    }
    setData(result);
    console.log('Compound Result:', result);
  }

  fetchCompound();
}, [provider, address, network]);


  return data;
}
