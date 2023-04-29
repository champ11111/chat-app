import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from 'src/entities';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  //find all rooms
  @Get('')
  findAll(): Promise<Room[]> {
    return this.roomService.findRooms();
  }

  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<Room> {
    return this.roomService.findRoomById(id);
  }

  //Create a new room
  @Post('')
  @UseInterceptors(FileInterceptor('groupPicture'))
  create(
    @Body() dto: CreateRoomDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Room> {
    console.log('dto', dto);
    return this.roomService.createRoom(dto, file);
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
