import { 
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Message, ReaderMessageRelation, Room, User } from 'src/entities';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private repo: Repository<Message>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(ReaderMessageRelation)
    private readerMessageRelationRepo: Repository<ReaderMessageRelation>,
  ) {}

  async findMessages(): Promise<Message[]> {
    //find all messages
    const messages = await this.repo.find({
      relations: ['readerMessageRelations', 'readerMessageRelations.reader', 'sender', 'room'],
    });
    return messages;
  }

  async findMessagesByRoomId(roomId: number): Promise<Message[]> {
    //find all messages by room id
    const messages = await this.repo.find({
      where: { room: { id: roomId } },
      relations: ['readerMessageRelations', 'readerMessageRelations.reader', 'sender', 'room'],
    });
    return messages;
  }

  async createMessage(dto: CreateMessageDto): Promise<Message> {
    //check if room exists
    const room = await this.roomRepo.findOne({ where: { id: dto.roomId }, relations: ['userRoomRelations', 'userRoomRelations.user'] });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    const users = room.userRoomRelations.map((relation) => relation.user.id);
    if(!users.includes(dto.senderId)) {
      throw new ConflictException('User is not in this chatroom');
    }
    if (!dto.senderId) {
      throw new BadRequestException('Invalid payload');
    }

    //check if sender exists
    const sender = await this.userRepo.findOne({ where: { id: dto.senderId } });
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }
    //create a new message with room id and sender id
    const message = new Message();
    message.room = room;
    message.sender = sender;
    message.content = dto.content;
    message.type = dto.type;
    return this.repo.save(message);
  }

  async markMessageAsRead(messageId: number, userId: number): Promise<Message> {
    //find message by id
    const message = await this.repo.findOne({
      where: { id: messageId },
      relations: ['readerMessageRelations', 'readerMessageRelations.reader'],
    });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    //find user by id
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(message.readerMessageRelations)
    //check if message has already been read by user
    const existingRelation = message.readerMessageRelations.find(
      (relation) => relation.reader.id === user.id,
    );
    if (existingRelation) {
      return message;
    }
    //create a new relation between message and user

    const relation = new ReaderMessageRelation();
    relation.reader = user;
    relation.message = message;
    await this.readerMessageRelationRepo.save(relation);

    message.readerMessageRelations.push(relation);

    return this.repo.save(message);
  }

  async deleteMessage(messageId: number): Promise<Message> {
    //find message by id
    const message = await this.repo.findOne({ where: { id: messageId } });
    console.log(message);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    //delete message cascade
    await this.repo.delete(message);
    return message;
  }
}
