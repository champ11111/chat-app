import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from 'src/entities';

interface CustomRequest extends Request {
  uid?: number;
}

@Controller('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  //Find all messages
  @Get('')
  findAll(): Promise<Message[]> {
    return this.service.findMessages();
  }

  //Find messages by room id
  @Get(':roomId')
  findByRoomId(@Param('roomId', new ParseIntPipe()) roomId: number) {
    return this.service.findMessagesByRoomId(roomId);
  }

  //Create a new message
  @Post('')
  create(
    @Body() dto: CreateMessageDto,
    @Req() req: CustomRequest,
  ): Promise<Message> {
    dto.senderId = req.uid;
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
