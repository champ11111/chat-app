import { MessageTypes } from 'src/entities';

export class CreateMessageDto {
  content: string;
  type: MessageTypes;
  senderId: number;
  roomId: number;
}
