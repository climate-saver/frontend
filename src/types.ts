export interface IMessage {
  id?: string;
  message: string;
  sender: 'User' | 'Bot';
  answerSuggestions?: string[];
  homeInfoKey?: string;
  more?: boolean;
}
