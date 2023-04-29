import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from 'src/entities';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  //Find all users
  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  //Find user by id
  async findOneById(id: number): Promise<User> {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['userRoomRelations', 'userRoomRelations.room'],
    });
    return user;
  }

  //Find user by email
  async findOneByEmail(email: string): Promise<User> {
    return this.repo.findOne({ where: { email } });
  }

  //Find user by username
  async findOneByUsername(username: string): Promise<User> {
    return this.repo.findOne({ where: { username } });
  }

  //Create a new user
  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByEmail(dto.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const password = await hash(dto.password, 10);
    const user = { ...new User(), ...dto, password };
    return this.repo.save(user);
  }

  //Update a user
  async update(id: number, dto: CreateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (dto.password) {
      user.password = await hash(dto.password, 10);
    }

    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.findOneById(id);
    await this.repo.remove(user);
    return user;
  }
}
