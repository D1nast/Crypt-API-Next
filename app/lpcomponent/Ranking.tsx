'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';  

// コインデータの型定義
interface CoinData {
  rank: number;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
}

export default function Ranking() {
  const [coins, setCoindata] = useState<CoinData[]>([]);

  // 値に小数点とカンマを付加する関数
  const convertNum = (num: string) => {
    const convert = Math.round(parseFloat(num)) / 100000;
    return convert.toLocaleString();
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API}`;
        const response = await axios.get(url);
        setCoindata(response.data.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };
    fetchCoin();
  }, []);

  return (
    <Box sx={{ paddingTop: '50px', paddingBottom: '50px', textAlign: 'center', backgroundColor: '#000000' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {coins.map((coin) => (
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
              <Typography variant="h5" component="div">{coin.rank}</Typography>
            </Box>
            {/* 通称 */}
            <Box sx={{ flex: 2, textAlign: 'center', color: 'white' }}>
              <Typography variant="h5" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {coin.name} ({coin.symbol})
              </Typography>
              <Typography variant="h5" component="div" sx={{ display: { xs: 'block', sm: 'none' } }}>
                {coin.name}
              </Typography>
            </Box>
            {/* 価格 */}
            <Box sx={{ flex: 2, textAlign: 'center', color: 'white' }}>
              <Typography variant="h5" component="div">${convertNum(coin.priceUsd)}</Typography>
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
