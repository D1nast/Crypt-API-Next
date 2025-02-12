
'use client';
import React from 'react';
import { FaGithub } from 'react-icons/fa'; 
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import ScrollToTopButton from './scrollTop'; 
import { Typography } from '@mui/material';

const Footer = () => {
  return (
        <Box sx={{ backgroundColor: '#000000', color: 'white', padding:{xs:'0',sm:'20px'}}}>
            <div style={{display:'flex',height:'auto',width:'100%'}}>

                {/* フッターの左半分 CNの画像 */}
                <Box sx={{display:{xs:'none',sm:'block'}}} style={{flex:'2',paddingLeft:'80px',width:'30%'}}>
                    <img src="/cnicon.png" alt="Description" style={{ width: '80%', height: 'auto' }} />
                </Box>

                {/* フッタの右半分　サイト説明 */}
                <Box sx={{paddingLeft:{xs:'20px',sm:'0'},flex:'8'}}>
                    <Box sx={{display:{xs:'flex',sm:'block'},flexDirection:{xs:'column',sm:'none'}}}>
                    <Typography variant="h5" sx={{borderBottom:'2px solid white',display:'inlin-block',width:'150px',marginBottom:{xs:'20px',sm:'none'},fontSize:{xs:'50px',sm:'20px'}}}>
                        About
                    </Typography>
                    <Typography sx={{fontSize:{xs:'20px',sm:'20px'}}}>
                        Delivering the latest news on cryptcurrency.<br/>
                        The news we provide is within the last 24 hours.
                    </Typography>
                    <Link href="https://github.com/D1nast" target="_blank" rel="noopener noreferrer" 
                    sx={{padding:{xs:'20px 0px 20px 20px',sm:'10px'},display:'block',}}>
                     <FaGithub size={24} color="#ffffff" />
                    </Link>
                    </Box>
                </Box>
            </div>
            {/* 画面最上部までスクロールする */}
            <ScrollToTopButton />
        </Box>
  );
}

export default Footer;