import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from 'src/entities';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  //find all rooms
  @Get('')
  async findAll(): Promise<Room[]> {
    const rooms = await this.roomService.findRooms();
    if(rooms.length === 0){
      throw new NotFoundException('Rooms not found');
    }
    return rooms;
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number): Promise<Room> {
    const room = await this.roomService.findRoomById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  //Create a new room
  @Post('')
  create(@Body() dto: CreateRoomDto): Promise<Room> {
    return this.roomService.createRoom(dto);
  }

  //Add a user to a room
  @Post('addUser')
  addUserToRoom(
    @Body() { roomId, userId }: { roomId: number; userId: number },
  ): Promise<Room> {
    return this.roomService.addUserToRoom(roomId, userId);
  }

  //Remove a user from a room
  @Post('removeUser')
  removeUserFromRoom(
    @Body() { roomId, userId }: { roomId: number; userId: number },
  ): Promise<Room> {
    return this.roomService.removeUserFromRoom(roomId, userId);
  }

  //Delete a room
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<Room> {
    return this.roomService.deleteRoom(id);
  }
}
