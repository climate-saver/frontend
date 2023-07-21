import React from 'react';
import {Box} from '@mui/material';

interface TitleBarProps {
  backgroundColor: string;
}

export default function TitleBar({backgroundColor}: TitleBarProps) {
  return (
    <Box sx={{flex: 0, padding: '16px', backgroundColor, borderBottom: '1px solid #EEEEEE'}}>
      <img
        style={{width: '160px', objectFit: 'contain', display: 'block', margin: 'auto'}}
        src={'/Climate_Saver.svg'}
        alt="Climate Saver Logo"
      />
    </Box>
  );
}
