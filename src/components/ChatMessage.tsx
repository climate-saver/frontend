import React from 'react';
import {Box} from '@mui/material';
import {IProjectRecommendationInfo} from '../types';
import ProjectRecommendationInfo from './ProjectRecommendationInfo';

interface ChatMessageProps {
  isBot: boolean;
  message?: string;
  botBubbleColor: string;
  botBubbleTextColor: string;
  bubbleTextSize: number;
  projectRecommendationInfo?: IProjectRecommendationInfo;
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
  projectRecommendationInfo,
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
    } else if (projectRecommendationInfo) {
      return <ProjectRecommendationInfo {...projectRecommendationInfo} />;
    }
    return <div className={'chat-message'}>{message}</div>;
  }

  return (
    <Box
      sx={{
        alignSelf: isBot ? 'flex-start' : 'flex-end',
        maxWidth: '70%',
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
