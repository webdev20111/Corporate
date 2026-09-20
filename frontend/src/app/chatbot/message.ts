export interface Message {

  sender: 'bot' | 'user';

  text: string;

  time?: string;

  typing?: boolean;

}