import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { User } from 'src/entities';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: Omit<User, 'id'>) {
    const user = await this.userService.create(dto);
    const accessToken = this.getTokenForUser(user.id);
    return {
      accessToken: accessToken,
    };
  }

  async login({ email, password }: Omit<User, 'id'>) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid username/password');
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new BadRequestException('Invalid username/password');
    }

    const accessToken = this.getTokenForUser(user.id);
    return {
      accessToken: accessToken,
    };
  }

  verifyToken(token: string): { uid: number } {
    const res = this.jwtService.verify<{ uid: number }>(token);
    return res;
  }

  getTokenForUser(uid: number): string {
    const payload = { uid };
    return this.jwtService.sign(payload);
  }
}
