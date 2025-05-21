import { useWallet } from '../context/WalletContext';
import Button from '@mui/material/Button';

export default function WalletConnect() {
  const { address, connect } = useWallet();

  return (
    <Button variant="contained" onClick={connect}>
      {address
        ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
        : 'Connect Wallet'}
    </Button>
  );
}
