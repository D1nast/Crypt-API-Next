import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Coinデータの型定義
interface Coin {
  rank: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
}

// Propsの型定義
interface RankingProps {
  data: Coin[];
}

export async function getStaticProps() {
  try {
    const req = await fetch("https://api.coincap.io/v2/assets?limit=30");
    const res = await req.json();

    console.log("Fetched Data:", res); // デバッグ用

    return { props: { data: res.data || [] } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: [] } };
  }
}

// Ranking コンポーネントに型を適用
export default function Ranking({ data }: RankingProps) {
  console.log("Rendered Data:", data); // デバッグ用

  if (!data || data.length === 0) return <p>Failed to fetch data</p>;

  const convertNum = (num: string) => {
    const convert = parseFloat(num) / 1e9; // 10億ドル単位（Billion USD）
    return convert.toLocaleString(undefined, { maximumFractionDigits: 2 }) + "B";
  };

  return (
    <Box sx={{ paddingTop: '50px', paddingBottom: '50px', textAlign: 'center', backgroundColor: '#000000' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {data.map((coin) => (
          <Box
            key={coin.rank}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: { xs: '100%', sm: '80%' },
              padding: { xs: '30px', sm: '10px' },
              borderBottom: '1px solid #ddd',
            }}
          >
            {/* 順位 */}
            <Box sx={{ color: 'white' }}>
              <Typography variant="h5">{coin.rank}</Typography>
            </Box>
            {/* 通称 */}
            <Box sx={{ flex: 2, textAlign: 'center', color: 'white' }}>
              <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {coin.name} ({coin.symbol})
              </Typography>
              <Typography variant="h5" sx={{ display: { xs: 'block', sm: 'none' } }}>
                {coin.name}
              </Typography>
            </Box>
            {/* 価格 */}
            <Box sx={{ flex: 2, textAlign: 'center', color: 'white' }}>
              <Typography variant="h5">${parseFloat(coin.priceUsd).toLocaleString()}</Typography>
            </Box>
            {/* 時価総額 */}
            <Box sx={{ flex: 2, textAlign: 'right', color: 'white', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="h5">${convertNum(coin.marketCapUsd)}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
