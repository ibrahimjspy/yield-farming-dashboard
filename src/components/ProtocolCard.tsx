import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

// Add protocol logos (host locally or use links)
const protocolLogos: Record<string, string> = {
  Compound: 'https://cryptologos.cc/logos/compound-comp-logo.png',
  Aave: 'https://cryptologos.cc/logos/aave-aave-logo.png',
  Yearn: 'https://cryptologos.cc/logos/yearn-finance-yfi-logo.png',
};

type ProtocolCardProps = {
  protocol: string;
  data: { symbol: string; apy: number; supplied: number }[];
};

export default function ProtocolCard({ protocol, data }: ProtocolCardProps) {
  return (
    <Card
      sx={{
        minWidth: 360,
        maxWidth: 420,
        margin: '0 auto',
        background: '#1e2128',
        boxShadow: 4,
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar src={protocolLogos[protocol] || ''} alt={protocol} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            {protocol}
          </Typography>
        </Stack>
        <Table size="small" sx={{ bgcolor: 'transparent' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#90caf9' }}>Asset</TableCell>
              <TableCell sx={{ color: '#90caf9' }}>APY</TableCell>
              <TableCell sx={{ color: '#90caf9' }}>Supplied</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((t) => (
              <TableRow key={t.symbol}>
                <TableCell>{t.symbol}</TableCell>
                <TableCell>
                  {t.apy > 0 ? t.apy.toFixed(2) + '%' : '-'}
                </TableCell>
                <TableCell>{t.supplied}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
