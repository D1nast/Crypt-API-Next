import React from 'react';
import { Button, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Tooltip title="Back to Top">
      <Button onClick={scrollToTop} variant="contained" color="primary"
        sx={{position: 'fixed',bottom: 16,right: 16,borderRadius: '50%',width: 56,
        height: 56,boxShadow: 3,backgroundColor: '#CCB3B7',color: '#22292C'}}>
        <ArrowUpwardIcon />
      </Button>
    </Tooltip>
  );
};

export default ScrollToTopButton;