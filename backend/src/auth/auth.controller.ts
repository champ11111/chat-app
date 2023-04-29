import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';

import { User } from 'src/entities';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  //Create a new user
  @Post('register')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async register(
    @Body() dto: Omit<User, 'id'>,
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { accessToken } = await this.service.register(dto, file);
      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.status(200).json({ accessToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  //Login a user
  @Post('login')
  async login(
    @Body() dto: Omit<User, 'id'>,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { accessToken } = await this.service.login(dto);
      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.status(200).json({ accessToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
