'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// タブのリンク
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Subscription', href: '/signup' },
  { name: 'GitHub', href: 'https://github.com/D1nast' }
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  // Drawerを開く/閉じる処理
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: 'hsla(0, 0%, 7%, 0.94)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{fontSize:{xs:'20px',sm:'30px'},fontWeight: '100',fontFamily: 'Poppins,Arial,sans-serif',flex: '8',}}>CRYPT PORTAL</Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, flex: 'auto' }}>
            {navItems.map((item) => (
              <Button key={item.name} component={Link} href={item.href} sx={{ color: '#FFFFFF' }}>
                {item.name}
              </Button>
            ))}
          </Box>

          {/* ハンバーガーメニュー（モバイル用） */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* モバイル用ドロワーメニュー */}
      <Drawer anchor="right"open={drawerOpen}onClose={toggleDrawer}sx={{'& .MuiDrawer-paper': {width: '250px',backgroundColor: 'hsla(0, 0%, 7%, 0.94)',color: 'white',},}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
          {navItems.map((item) => (
            <Button key={item.name} component={Link} href={item.href} sx={{ color: '#FFFFFF', padding: '10px 0' }} onClick={toggleDrawer}>
              {item.name}
            </Button>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;