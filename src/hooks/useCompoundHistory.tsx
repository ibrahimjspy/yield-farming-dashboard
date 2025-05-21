import { useEffect, useState } from 'react';

export function useCompoundHistory(cTokenAddress: string) {
  const [data, setData] = useState<{ timestamp: number; apy: number }[]>([]);
  useEffect(() => {
    async function fetchHistory() {
      // 30 days ago
      const now = Math.floor(Date.now() / 1000);
      const thirtyDaysAgo = now - 60 * 60 * 24 * 30;
      const url = `https://api.compound.finance/api/v2/market_history/graph?asset=${cTokenAddress}&min_block_timestamp=${thirtyDaysAgo}&max_block_timestamp=${now}&num_buckets=30`;

      const res = await fetch(url);
      const json = await res.json();
      // API returns .supply_apys: {timestamp: [], value: []}
      const points: { timestamp: number; apy: number }[] = (
        json?.supply_apys?.timestamp || []
      ).map((ts: number, i: number) => ({
        timestamp: ts,
        apy: json.supply_apys.value[i],
      }));
      setData(points);
    }
    fetchHistory();
  }, [cTokenAddress]);
  return data;
}
