import {
  Body,
  Controller,
  HttpCode,
  Post,
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
    @Res() res: Response,
  ) {
    try {
      const { accessToken } = await this.service.register(dto, file);
      res.cookie('accessToken', accessToken, { httpOnly: true });
      console.log('accessToken: ', accessToken);
      return { accessToken };
    } catch (err) {
      console.log(err);
    }
  }

  //Login a user
  @Post('login')
  async login(@Body() dto: Omit<User, 'id'>, @Res() res: Response) {
    const { accessToken } = await this.service.login(dto);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    console.log('accessToken: ', accessToken);
    return { accessToken };
  }
}
