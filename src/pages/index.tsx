import WalletConnect from '../components/WalletConnect';
import NetworkSwitch from '../components/NetworkSwitch';
import ProtocolCard from '../components/ProtocolCard';
import { useCompound } from '../hooks/useCompound';
import ApyChart from '../components/ApyChart';
import { useApyHistory } from '@/hooks/useApyHistory';

export default function Home() {
  const compoundData = useCompound();
const cDaiApyHistory = useApyHistory('compound', 'ethereum', 'DAI');
console.log('CompoundData:', compoundData);
  return (
    <main style={{ padding: 32, minHeight: '100vh', background: '#15171c' }}>
      <h1 style={{ color: '#90caf9', textAlign: 'center', fontWeight: 800 }}>
        Yield Farming Dashboard
      </h1>
      <div
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <WalletConnect />
        <NetworkSwitch />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <ProtocolCard protocol="Compound" data={compoundData} />
      </div>
      <div style={{ maxWidth: 500, margin: '32px auto' }}>
        <h3 style={{ textAlign: 'center', color: '#90caf9' }}>
          cDAI APY (Last 30 Days)
        </h3>
        <ApyChart data={cDaiApyHistory} />
      </div>
    </main>
  );
}
