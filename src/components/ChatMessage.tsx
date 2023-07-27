import React from 'react';
import {Box} from '@mui/material';

interface ChatMessageProps {
  isBot: boolean;
  message: string;
  botBubbleColor: string;
  botBubbleTextColor: string;
  bubbleTextSize: number;
  selfBubbleColor: string;
  selfBubbleTextColor: string;
  showIsTypingAnimation?: boolean;
}
export default function ChatMessage({
  isBot,
  message,
  botBubbleColor,
  botBubbleTextColor,
  bubbleTextSize,
  selfBubbleColor,
  selfBubbleTextColor,
  showIsTypingAnimation,
}: ChatMessageProps) {
  function renderMessageBody() {
    if (showIsTypingAnimation) {
      return (
        <Box>
          <div className="typing__dot"></div>
          <div className="typing__dot"></div>
          <div className="typing__dot"></div>
        </Box>
      );
    }
    return <div className={'chat-message'}>{message}</div>;
  }

  return (
    <Box
      sx={{
        alignSelf: isBot ? 'flex-start' : 'flex-end',
        maxWidth: '60%',
        padding: '16px',
        borderBottomRightRadius: isBot ? '12px' : 0,
        borderBottomLeftRadius: isBot ? 0 : '12px',
        borderTopRightRadius: '12px',
        borderTopLeftRadius: '12px',
        color: isBot ? botBubbleTextColor : selfBubbleTextColor,
        backgroundColor: isBot ? botBubbleColor : selfBubbleColor,
        fontSize: bubbleTextSize,
      }}
      mb={2}
    >
      {renderMessageBody()}
    </Box>
  );
}
