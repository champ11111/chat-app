import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { User } from 'src/entities';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  //Create a new user
  @Post('register')
  async register(@Body() dto: Omit<User, 'id'>, @Res() res: Response) {
    const { accessToken } = await this.service.register(dto);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    return { accessToken };
  }

  //Login a user
  @Post('login')
  async login(@Body() dto: Omit<User, 'id'>, @Res() res: Response) {
    const { accessToken } = await this.service.login(dto);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    return { accessToken };
  }
}
