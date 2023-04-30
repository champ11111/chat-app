import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  NotFoundException
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from 'src/entities';

@Controller('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  //Find all messages
  @Get('')
  async findAll(): Promise<Message[]> {
    const messages = await this.service.findMessages();
    if (messages.length === 0) {
      throw new NotFoundException('Messages not found');
    }
    return messages;
  }

  //Find messages by room id
  @Get(':roomId')
  async findByRoomId(@Param('roomId', new ParseIntPipe()) roomId: number) {
    const message = await this.service.findMessagesByRoomId(roomId);
    if (message.length === 0) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  //Create a new message
  @Post('')
  create(@Body() dto: CreateMessageDto): Promise<Message> {
    return this.service.createMessage(dto);
  }

  //mark a message as read
  @Post('markAsRead')
  markAsRead(
    @Body() { messageId, userId }: { messageId: number; userId: number },
  ): Promise<Message> {
    return this.service.markMessageAsRead(messageId, userId);
  }

  //Delete a message
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<Message> {
    return this.service.deleteMessage(id);
  }
}
