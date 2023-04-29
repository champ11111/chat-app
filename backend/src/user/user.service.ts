import { 
  Injectable,
  ConflictException,
  NotFoundException, 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from 'src/entities';
import { CreateUserDto } from './dto/create-user.dto';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly imageService: ImageService,
  ) {}

  //Find all users
  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  //Find user by id
  async findOneById(id: number): Promise<User> {
    const user = await this.repo.findOne({
      where: { id },
      relations: [
        'userRoomRelations',
        'userRoomRelations.room',
        'userRoomRelations.user',
      ],
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
      throw new ConflictException('User already exists');
    }

    const password = await hash(dto.password, 10);
    const user = { ...new User(), ...dto, password };
    return this.repo.save(user);
  }

  //Update a user
  async update(
    id: number,
    dto: CreateUserDto,
    file: Express.Multer.File,
  ): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.password) {
      user.password = await hash(dto.password, 10);
    }

    if (file) {
      const profilePictureUrl = await this.imageService.uploadImageToS3(file);
      user.profilePictureUrl = profilePictureUrl;
    }

    Object.assign(user, dto);

    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.repo.remove(user);
    return user;
  }
}
