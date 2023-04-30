import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('setup')
  handleSetup(client: Socket, user: any): void {
    client.join(user._id);
    client.emit('connected');
  }

  @SubscribeMessage('join room')
  handleJoinRoom(client: Socket, room: string): void {
    this.logger.log(`user join room id ${room}`);
    client.join(room);
  }

  @SubscribeMessage('new message')
  handleNewMessage(client: Socket, receivedMessage: any): void {
    const room = receivedMessage.room;
    this.logger.log(`new message to room id ${room}`);
    client.to(room.id).emit('message received', receivedMessage);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
