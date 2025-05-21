import { useWallet } from '../context/WalletContext';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function NetworkSwitch() {
  const { network, switchNetwork } = useWallet();

  return (
    <FormControl size="small" style={{ minWidth: 140, marginLeft: 12 }}>
      <InputLabel id="network-select-label">Network</InputLabel>
      <Select
        labelId="network-select-label"
        id="network-select"
        value={network}
        label="Network"
        onChange={(e) => switchNetwork(e.target.value as any)}
      >
        <MenuItem value="mainnet">Mainnet</MenuItem>
        <MenuItem value="sepolia">Sepolia</MenuItem>
        <MenuItem value="goerli">Goerli</MenuItem>
      </Select>
    </FormControl>
  );
}
