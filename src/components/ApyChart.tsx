import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ApyChart({
  data,
}: {
  data: { timestamp: number; apy: number }[];
}) {
  if (!data.length) return <div>Loading chart...</div>;
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(ts) =>
              new Date(ts * 1000).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })
            }
            minTickGap={20}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(v) => `${v.toFixed(2)}%`}
          />
          <Tooltip
            formatter={(v) => `${v.toFixed(2)}%`}
            labelFormatter={(l) => new Date(l * 1000).toLocaleDateString()}
          />
          <Line
            type="monotone"
            dataKey="apy"
            stroke="#4caf50"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
