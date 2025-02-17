'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';  
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardContent } from '@mui/material';

// ニュース記事の型定義
interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}
// Propsの型定義
  interface NewsProps {
    data: Article[];
}

interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index, ...other }: CustomTabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NewsAPI({data}:NewsProps) {  
  const [value, setValue] = useState<number>(0);
  return (
    <Box sx={{ backgroundColor: '#000000', maxWidth: '100%' }}>
      {/* タイトル */}
      <Box sx={{ marginTop: '40px', paddingTop: '20px', textAlign: 'center' }}>
        <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant="h4" color="#FFFFFF" margin="15px">
          News
        </Typography>
      </Box>
      
      {/* タブ */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs value={value} sx={{ '& .MuiTabs-indicator': { backgroundColor: 'white' } }} onChange={(e, newValue) => setValue(newValue)} centered>
          {[...Array(4)].map((_, index) => (
            <Tab key={index} label={`${index + 1}`} sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      
      {/* 記事一覧 */}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingTop: { xs: '5px', sm: '30px' }, justifyContent: 'center' }}>
        {[0, 8, 16, 24].map((startIndex, tabIndex) => (
          <CustomTabPanel key={tabIndex} value={value} index={tabIndex}>
            {data.slice(startIndex, startIndex + 8).map((res, key) => (
              <Card key={key} sx={{ maxWidth: 260, maxHeight: 400, marginBottom: 2, display: { xs: 'none', sm: 'block' } }}>
                <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <CardMedia sx={{ height: 160, objectFit: 'cover' }} image={res.urlToImage} />
                </a>
                <CardContent sx={{ paddingTop: '1px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>{res.title}</Typography>
                  <Typography>{res.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
}
