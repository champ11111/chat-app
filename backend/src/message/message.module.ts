import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message, ReaderMessageRelation, Room, User } from 'src/entities';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User, Room, ReaderMessageRelation]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
