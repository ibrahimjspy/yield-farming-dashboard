import { useEffect, useState } from 'react';

export function useApyHistory(protocol: string, chain: string, symbol: string) {
  const [data, setData] = useState<{ timestamp: number; apy: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all pools
        const poolsRes = await fetch('https://yields.llama.fi/pools');
          const poolsJson = await poolsRes.json();
          
          console.log('Pools Data:', poolsJson);

        // Find the pool that matches the protocol, chain, and symbol
        const pool = poolsJson.data.find(
        (p: any) =>
            p.project.toLowerCase() === 'aave' &&
            p.chain.toLowerCase() === 'ethereum' &&
            p.symbol.toLowerCase() === 'usdc',
        );

        if (!pool) {
          console.error('Pool not found');
          return;
        }

        // Fetch historical data for the identified pool
        const chartRes = await fetch(
          `https://yields.llama.fi/chart/${pool.pool}`,
        );
          const chartJson = await chartRes.json();
          
          console.log('Chart Data:', chartJson);

        // Map the data to the desired format
        const formattedData = chartJson.data.map((item: any) => ({
          timestamp: item.timestamp,
          apy: item.apy,
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching APY history:', error);
      }
    }

    fetchData();
  }, [protocol, chain, symbol]);

  return data;
}
