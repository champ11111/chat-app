import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room, User, UserRoomRelation } from 'src/entities';
import { CreateRoomDto } from './dto/create-room.dto';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private repo: Repository<Room>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserRoomRelation)
    private userRoomRelationRepo: Repository<UserRoomRelation>,
    private readonly imageService: ImageService,
  ) {}

  async findRooms(): Promise<Room[]> {
    return this.repo.find({
      relations: ['userRoomRelations', 'userRoomRelations.user'],
    });
  }

  async findRoomById(id: number): Promise<Room> {
    return this.repo.findOne({
      where: { id: id },
      relations: ['userRoomRelations', 'userRoomRelations.user'],
    });
  }

  async createRoom(
    dto: CreateRoomDto,
    file: Express.Multer.File,
  ): Promise<Room> {
    if (file) {
      const profilePictureUrl = await this.imageService.uploadImageToS3(file);
      dto.groupPictureUrl = profilePictureUrl;
    } else {
      dto.groupPictureUrl =
        'https://geodash.gov.bd/uploaded/people_group/default_group.png';
    }
    let isGroupChatBool;

    if (dto.isGroupChat === 'true') {
      isGroupChatBool = true;
    } else if (dto.isGroupChat === 'false') {
      isGroupChatBool = false;
    }

    const room = new Room();
    room.name = dto.name;
    room.isGroupChat = isGroupChatBool;
    room.groupPictureUrl = dto.groupPictureUrl;
    room.userRoomRelations = [];

    //check if users exist
    if (dto.userIds) {
      for (const userId of dto.userIds) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        const userRoomRelation = new UserRoomRelation();
        userRoomRelation.user = user;
        userRoomRelation.room = room;

        room.userRoomRelations.push(userRoomRelation);
      }
    }

    await this.repo.save(room);
    await this.saveUserRoomRelations(room, dto.userIds);
    return this.repo.findOne({
      where: { id: room.id },
      relations: ['userRoomRelations', 'userRoomRelations.user'],
    });
  }

  async saveUserRoomRelations(room: Room, userIds: number[]): Promise<void> {
    for (const userId of userIds) {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const userRoomRelation = new UserRoomRelation();
      userRoomRelation.user = user;
      userRoomRelation.room = room;
      await this.userRoomRelationRepo.save(userRoomRelation);
    }
  }

  async addUserToRoom(roomId: number, userId: number): Promise<Room> {
    const room = await this.repo.findOne({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (!room.isGroupChat) {
      throw new ConflictException('Room is not a group chat');
    }

    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    //check if user is already in room
    const userRoomRelationExists = await this.userRoomRelationRepo.findOne({
      where: { user: { id: userId }, room: { id: roomId } },
    });

    if (userRoomRelationExists) {
      throw new ConflictException('User is already in room');
    }

    const userRoomRelation = new UserRoomRelation();
    userRoomRelation.user = user;
    userRoomRelation.room = room;
    await this.userRoomRelationRepo.save(userRoomRelation);

    return this.repo.findOne({
      where: { id: room.id },
      relations: ['userRoomRelations', 'userRoomRelations.user'],
    });
  }

  async removeUserFromRoom(roomId: number, userId: number): Promise<Room> {
    const room = await this.repo.findOne({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (!room.isGroupChat) {
      throw new ConflictException('Room is not a group chat');
    }

    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userRoomRelation = await this.userRoomRelationRepo.findOne({
      where: { user: { id: userId }, room: { id: roomId } },
    });

    if (!userRoomRelation) {
      throw new NotFoundException('User not found in this room');
    }

    await this.userRoomRelationRepo.delete({ id: userRoomRelation.id });

    // room.userRoomRelations = room.userRoomRelations.filter(
    //   (urr) => urr.id !== userRoomRelation.id,
    // );

    return this.repo.findOne({
      where: { id: room.id },
      relations: ['userRoomRelations', 'userRoomRelations.user'],
    });
  }

  async deleteRoom(id: number): Promise<Room> {
    const room = await this.repo.findOne({
      where: { id },
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    await this.repo.remove(room);
    return room;
  }
}
