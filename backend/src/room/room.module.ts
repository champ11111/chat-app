import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room, User, UserRoomRelation } from 'src/entities';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User, UserRoomRelation])],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
