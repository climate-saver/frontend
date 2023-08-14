import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Box} from '@mui/material';
import './ChatBot.css';
import BottomToolbar from './BottomToolbar';
import TitleBar from './TitleBar';
import ChatMessage from './ChatMessage';
import {API} from '../Api';
import {IMessage, IProjectRecommendationInfo} from '../types';

const CHAT_PRE_TYPING_PAUSE_DURATION = 200;
const CHAT_PAUSE_BUBBLE_DURATION = 1300;

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
  suggestionColor?: string;
  textFieldPlaceholderText?: string;
}

const DEFAULTS = {
  BACKGROUND_COLOR: '#F6F8FE',
  BOTTOM_TOOLBAR_BACKGROUND_COLOR: 'white',
  BOT_BUBBLE_COLOR: 'white',
  BOT_BUBBLE_TEXT_COLOR: 'black',
  BUBBLE_TEXT_SIZE: 16,
  MAX_WIDTH: 800,
  SELF_BUBBLE_COLOR: '#3DCB78',
  SELF_BUBBLE_TEXT_COLOR: 'white',
  SEND_BUTTON_COLOR: '#3DCB78',
  SEND_BUTTON_ICON_COLOR: 'white',
  SUGGESTION_COLOR: '#2B6744',
  TEXTFIELD_PLACEHOLDER_TEXT: 'Type message...',
};

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
  suggestionColor,
  textFieldPlaceholderText,
}: ChatBotProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [postRecommendationMessages, setPostRecommendationMessages] = useState<IMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>('');
  const [projectRecommendations, setProjectRecommendations] = useState<
    IProjectRecommendationInfo[]
  >([]);
  const [awaitingBotResponse, setAwaitingBotResponse] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const shouldFocusInput = useCallback(() => {
    return messages[messages.length - 1] && messages[messages.length - 1].autoFocus;
  }, [messages]);

  const setInputFocused = useCallback(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef]);

  const shouldFetchNextMessage = useCallback(() => {
    return (
      messages.length === 0 ||
      messages[messages.length - 1].sender === 'User' ||
      messages[messages.length - 1].more
    );
  }, [messages]);

  const addSystemMessage = useCallback(
    (message: IMessage) => {
      setTimeout(() => {
        setMessages([...messages, message]);
        setIsTyping(false);
        setAwaitingBotResponse(false);
      }, CHAT_PAUSE_BUBBLE_DURATION);
    },
    [messages]
  );

  const shouldFetchProjectRecommendations = useCallback(() => {
    return messages.length > 0 && messages[messages.length - 1].readyForRecommendations;
  }, [messages]);

  const addProjectRecommendations = useCallback(
    (projectRecommendations: IProjectRecommendationInfo[]) => {
      setTimeout(() => {
        setProjectRecommendations(projectRecommendations);
        setPostRecommendationMessages([
          {
            sender: 'Bot',
            answerSuggestions: [`Yes, let's do it!`],
            message:
              `Note that all the numbers above are just estimates. Would you like to request` +
              ` free quotes from our network of local contractors?`,
          },
        ]);
        setIsTyping(false);
        setAwaitingBotResponse(false);
      }, CHAT_PAUSE_BUBBLE_DURATION);
    },
    []
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  // Initialize the conversation:
  useEffect(() => {
    (async () => {
      if (!conversationId) {
        let conversation = await API.createConversation();
        setConversationId(conversation.id);
      }
    })();
  }, [conversationId]);

  useEffect(() => {
    (async () => {
      if (conversationId && shouldFetchNextMessage()) {
        setAwaitingBotResponse(true);
        setTimeout(() => setIsTyping(true), CHAT_PRE_TYPING_PAUSE_DURATION);
        addSystemMessage(await API.getNextMessage(conversationId));
      }
    })();
  }, [conversationId, messages, shouldFetchNextMessage, addSystemMessage]);

  useEffect(() => {
    (async () => {
      if (conversationId && shouldFetchProjectRecommendations()) {
        setAwaitingBotResponse(true);
        setTimeout(() => setIsTyping(true), CHAT_PRE_TYPING_PAUSE_DURATION);
        addProjectRecommendations(await API.getProjectRecommendations(conversationId));
      }
    })();
  }, [conversationId, messages, shouldFetchProjectRecommendations]);

  useEffect(() => {
    (async () => {
      if (conversationId && shouldFocusInput()) {
        setInputFocused();
      }
    })();
  }, [conversationId, messages, shouldFocusInput, setInputFocused]);

  // Scroll to bottom when new messages are added:
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  function renderChatMessage(message: IMessage) {
    return (
      <ChatMessage
        key={message.message}
        isBot={message.sender === 'Bot'}
        message={message.message}
        botBubbleColor={botBubbleColor || DEFAULTS.BOT_BUBBLE_COLOR}
        botBubbleTextColor={botBubbleTextColor || DEFAULTS.BOT_BUBBLE_TEXT_COLOR}
        bubbleTextSize={bubbleTextSize || DEFAULTS.BUBBLE_TEXT_SIZE}
        selfBubbleColor={selfBubbleColor || DEFAULTS.SELF_BUBBLE_COLOR}
        selfBubbleTextColor={selfBubbleTextColor || DEFAULTS.SELF_BUBBLE_TEXT_COLOR}
      />
    );
  }

  function renderProjectRecommendation(projectData: any) {
    return (
      <ChatMessage
        key={projectData.name}
        isBot={true}
        botBubbleColor={botBubbleColor || DEFAULTS.BOT_BUBBLE_COLOR}
        botBubbleTextColor={botBubbleTextColor || DEFAULTS.BOT_BUBBLE_TEXT_COLOR}
        bubbleTextSize={bubbleTextSize || DEFAULTS.BUBBLE_TEXT_SIZE}
        projectRecommendationInfo={projectData}
        selfBubbleColor={selfBubbleColor || DEFAULTS.SELF_BUBBLE_COLOR}
        selfBubbleTextColor={selfBubbleTextColor || DEFAULTS.SELF_BUBBLE_TEXT_COLOR}
      />
    );
  }

  function renderIsTypingChatBubble() {
    if (!isTyping) {
      return;
    }
    return (
      <ChatMessage
        key={'typing'}
        isBot={true}
        showIsTypingAnimation={isTyping}
        message={''}
        botBubbleColor={botBubbleColor || DEFAULTS.BOT_BUBBLE_COLOR}
        botBubbleTextColor={botBubbleTextColor || DEFAULTS.BOT_BUBBLE_TEXT_COLOR}
        bubbleTextSize={bubbleTextSize || DEFAULTS.BUBBLE_TEXT_SIZE}
        selfBubbleColor={selfBubbleColor || DEFAULTS.SELF_BUBBLE_COLOR}
        selfBubbleTextColor={selfBubbleTextColor || DEFAULTS.SELF_BUBBLE_TEXT_COLOR}
      />
    );
  }

  function addMessage(message: string, isBot: boolean) {
    setMessages([...messages, {sender: isBot ? 'Bot' : 'User', message}]);
  }

  function getCurrentHomeInfoKey(): string | undefined {
    const botMessages = messages.filter((m) => m.sender === 'Bot');
    return botMessages[botMessages.length - 1] && botMessages[botMessages.length - 1].homeInfoKey;
  }

  function getMessageSuggestions(): string[] | undefined {
    if (!messages.length || messages[messages.length - 1].sender !== 'Bot') {
      return;
    }
    const botMessages = messages.filter((m) => m.sender === 'Bot');
    return (
      botMessages[botMessages.length - 1] && botMessages[botMessages.length - 1].answerSuggestions
    );
  }

  async function sendMessage(message: string) {
    addMessage(message, false);
    await API.sendMessage(conversationId, message, getCurrentHomeInfoKey());
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
      <Box sx={{flex: 1, overflow: 'auto'}}>
        <Box
          sx={{
            margin: 'auto',
            padding: '20px 20px 12px',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: maxWidth ? maxWidth : DEFAULTS.MAX_WIDTH,
          }}
        >
          {messages.map((message) => renderChatMessage(message))}
          {projectRecommendations.map((project) => renderProjectRecommendation(project))}
          {postRecommendationMessages.map((message) => renderChatMessage(message))}
          {renderIsTypingChatBubble()}
          <div ref={messagesEndRef} />
        </Box>
      </Box>
      <BottomToolbar
        awaitingBotResponse={awaitingBotResponse}
        backgroundColor={bottomToolbarBackgroundColor || DEFAULTS.BOTTOM_TOOLBAR_BACKGROUND_COLOR}
        inputRef={inputRef}
        maxWidth={maxWidth || DEFAULTS.MAX_WIDTH}
        onClickSendButton={(message) => sendMessage(message)}
        sendButtonColor={sendButtonColor || DEFAULTS.SEND_BUTTON_COLOR}
        sendButtonIconColor={sendButtonIconColor || DEFAULTS.SEND_BUTTON_ICON_COLOR}
        suggestionColor={suggestionColor || DEFAULTS.SUGGESTION_COLOR}
        suggestions={getMessageSuggestions()}
        textFieldPlaceholderText={textFieldPlaceholderText || DEFAULTS.TEXTFIELD_PLACEHOLDER_TEXT}
      />
    </Box>
  );
}
