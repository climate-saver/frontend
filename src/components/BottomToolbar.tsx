import React, {useState} from 'react';
import {Box, IconButton, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface BottomToolbarProps {
  backgroundColor: string;
  maxWidth: number;
  textFieldPlaceholderText: string;
  sendButtonColor: string;
  sendButtonIconColor: string;
}

export default function BottomToolbar({
  backgroundColor,
  maxWidth,
  textFieldPlaceholderText,
  sendButtonColor,
  sendButtonIconColor,
}: BottomToolbarProps) {
  const [message, setMessage] = useState('');

  function shouldEnableSendButton() {
    return Boolean(message);
  }

  return (
    <Box
      sx={{
        flex: 0,
        backgroundColor,
        borderTop: '1px solid #EEEEEE',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          margin: 'auto',
          maxWidth,
          padding: '16px',
          alignItems: 'flex-end',
        }}
      >
        <TextField
          sx={{flex: 1}}
          multiline={true}
          placeholder={textFieldPlaceholderText}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton
          sx={{
            marginLeft: '10px',
            borderRadius: '16px',
            backgroundColor: sendButtonColor,
            height: '49px',
          }}
          disableFocusRipple={true}
          disableRipple={true}
          disabled={!shouldEnableSendButton()}
        >
          <SendIcon
            sx={{
              color: shouldEnableSendButton() ? sendButtonIconColor : '#E0E0E0',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
