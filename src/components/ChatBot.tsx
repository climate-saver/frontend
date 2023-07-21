import React from 'react';
import {Box} from '@mui/material';
import './ChatBot.css';
import BottomToolbar from './BottomToolbar';
import TitleBar from './TitleBar';
import ChatMessage from './ChatMessage';
import {API} from '../Api';

interface ChatBotProps {
  backgroundColor?: string;
  bottomToolbarBackgroundColor?: string;
  bubbleTextSize?: number;
  botBubbleColor?: string;
  botBubbleTextColor?: string;
  fullScreen?: boolean;
  maxWidth?: number;
  selfBubbleColor?: string;
  selfBubbleTextColor?: string;
  sendButtonColor?: string;
  sendButtonIconColor?: string;
  textFieldPlaceholderText?: string;
}

const DEFAULTS = {
  BACKGROUND_COLOR: '#F6F8FE',
  BOTTOM_TOOLBAR_BACKGROUND_COLOR: 'white',
  BOT_BUBBLE_COLOR: 'white',
  BOT_BUBBLE_TEXT_COLOR: 'black',
  BUBBLE_TEXT_SIZE: 17,
  MAX_WIDTH: 800,
  SELF_BUBBLE_COLOR: '#3DCB78',
  SELF_BUBBLE_TEXT_COLOR: 'white',
  SEND_BUTTON_COLOR: '#3DCB78',
  SEND_BUTTON_ICON_COLOR: 'white',
  TEXTFIELD_PLACEHOLDER_TEXT: 'Type message...',
};

const SAMPLE_DATA = [
  {
    bot: true,
    message:
      "Hey, I'm Climate Bot! I can help you learn more about savings and " +
      'energy rebates in your area. What would you like to know?',
  },
  {
    bot: false,
    message: "I'd love to learn about the rebates I can get on solar panels!",
  },
];

export default function ChatBot({
  backgroundColor,
  bottomToolbarBackgroundColor,
  bubbleTextSize,
  botBubbleColor,
  botBubbleTextColor,
  maxWidth,
  selfBubbleColor,
  selfBubbleTextColor,
  sendButtonColor,
  sendButtonIconColor,
  textFieldPlaceholderText,
}: ChatBotProps) {
  function renderChatMessage(message: {bot: boolean; message: string}) {
    return (
      <ChatMessage
        key={message.message}
        isBot={message.bot}
        message={message.message}
        botBubbleColor={botBubbleColor || DEFAULTS.BOT_BUBBLE_COLOR}
        botBubbleTextColor={botBubbleTextColor || DEFAULTS.BOT_BUBBLE_TEXT_COLOR}
        bubbleTextSize={bubbleTextSize || DEFAULTS.BUBBLE_TEXT_SIZE}
        selfBubbleColor={selfBubbleColor || DEFAULTS.SELF_BUBBLE_COLOR}
        selfBubbleTextColor={selfBubbleTextColor || DEFAULTS.SELF_BUBBLE_TEXT_COLOR}
      />
    );
  }

  async function sendMessage(message: string) {
    // TODO add chat message to list:
    // TODO Send message to backend and get response(s)
    await API.sendMessage(message);
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexFlow: 'column',
        backgroundColor: backgroundColor ? backgroundColor : DEFAULTS.BACKGROUND_COLOR,
      }}
    >
      <TitleBar backgroundColor={backgroundColor ? backgroundColor : DEFAULTS.BACKGROUND_COLOR} />
      <Box sx={{flex: 1}}>
        <Box
          sx={{
            margin: 'auto',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: maxWidth ? maxWidth : DEFAULTS.MAX_WIDTH,
          }}
        >
          {SAMPLE_DATA.map((message) => renderChatMessage(message))}
        </Box>
      </Box>
      <BottomToolbar
        backgroundColor={bottomToolbarBackgroundColor || DEFAULTS.BOTTOM_TOOLBAR_BACKGROUND_COLOR}
        maxWidth={maxWidth || DEFAULTS.MAX_WIDTH}
        onClickSendButton={(message) => sendMessage(message)}
        sendButtonColor={sendButtonColor || DEFAULTS.SEND_BUTTON_COLOR}
        sendButtonIconColor={sendButtonIconColor || DEFAULTS.SEND_BUTTON_ICON_COLOR}
        textFieldPlaceholderText={textFieldPlaceholderText || DEFAULTS.TEXTFIELD_PLACEHOLDER_TEXT}
      />
    </Box>
  );
}
