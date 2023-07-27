import React, {useState} from 'react';
import {Box, Chip, IconButton, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface BottomToolbarProps {
  awaitingBotResponse: boolean;
  backgroundColor: string;
  maxWidth: number;
  onClickSendButton: (message: string) => void;
  sendButtonColor: string;
  sendButtonIconColor: string;
  suggestionColor: string;
  suggestions?: string[];
  textFieldPlaceholderText: string;
}

export default function BottomToolbar({
  awaitingBotResponse,
  backgroundColor,
  maxWidth,
  onClickSendButton,
  sendButtonColor,
  sendButtonIconColor,
  suggestionColor,
  suggestions,
  textFieldPlaceholderText,
}: BottomToolbarProps) {
  const [message, setMessage] = useState('');

  function shouldEnableSendButton() {
    return Boolean(message) && !awaitingBotResponse;
  }

  function clickSendButton() {
    onClickSendButton(message);
    setMessage('');
  }

  function renderSuggestion(suggestion: string) {
    return (
      <Chip
        sx={{
          marginRight: '10px',
          borderRadius: '10px',
          paddingLeft: '7px',
          paddingRight: '7px',
          paddingTop: '5px',
          paddingBottom: '5px',
          color: suggestionColor,
          borderColor: suggestionColor,
        }}
        variant={'outlined'}
        label={suggestion}
        onClick={() => setMessage(suggestion)}
      />
    );
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
          value={message}
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
          onClick={clickSendButton}
        >
          <SendIcon
            sx={{
              color: shouldEnableSendButton() ? sendButtonIconColor : '#E0E0E0',
            }}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          margin: 'auto',
          maxWidth,
          padding: '16px',
          paddingTop: 0,
        }}
      >
        {suggestions?.map((suggestion) => renderSuggestion(suggestion))}
      </Box>
    </Box>
  );
}
