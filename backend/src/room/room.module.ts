import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room, User, UserRoomRelation } from 'src/entities';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, User, UserRoomRelation]),
    ImageModule,
  ],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
