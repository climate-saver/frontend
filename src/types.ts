export interface IMessage {
  id?: string;
  message: string;
  sender: 'User' | 'Bot';
  homeInfoKey?: string;
  more?: boolean;
}
