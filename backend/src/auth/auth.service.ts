import { NotFoundException,ConflictException, Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { User } from 'src/entities';
import { ImageService } from 'src/image/image.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly imageService: ImageService,
  ) {}

  async register(
    dto: Omit<User, 'id'>,
    file: Express.Multer.File,
  ): Promise<{ accessToken: string }> {
    if (file) {
      const profilePictureUrl = await this.imageService.uploadImageToS3(file);
      dto.profilePictureUrl = profilePictureUrl;
    }

    //Check if email is already in use
    const userWithEmail = await this.userService.findOneByEmail(dto.email);
    if (userWithEmail) {
      throw new ConflictException('Email is already in use');
    }
    const user = await this.userService.create(dto);
    const accessToken = await this.getTokenForUser(user.id);
    return {
      accessToken: accessToken,
    };
  }

  async login({
    email,
    password,
  }: Omit<User, 'id'>): Promise<{ accessToken: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid username/password');
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new BadRequestException('Invalid username/password');
    }

    const accessToken = await this.getTokenForUser(user.id);
    return {
      accessToken: accessToken,
    };
  }

  async verifyToken(token: string): Promise<{ uid: number }> {
    const res = await this.jwtService.verify<{ uid: number }>(token);
    return res;
  }

  async getTokenForUser(uid: number): Promise<string> {
    const payload = { uid };
    return this.jwtService.sign(payload);
  }
}
