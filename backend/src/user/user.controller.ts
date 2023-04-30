import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { User } from 'src/entities';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  //Find all users
  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.service.findAll();
    if(users.length === 0){
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  //Find user by id
  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    const user = await this.service.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  //Find user by email
  @Get('email/:email')
  findByEmail(@Param('email') email: string): Promise<User> {
    const user = this.service.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  //Find user by username
  @Get('username/:username')
  findByUsername(@Param('username') username: string): Promise<User> {
    const user = this.service.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  //Create a new user
  // @Post()
  // async create(
  //   @Body() dto: CreateUserDto,
  //   @Res() res: Response,
  // ): Promise<User> {
  //   const user = await this.service.create(dto);

  //   const accessToken = this.authService.getTokenForUser(user.id);
  //   res.cookie('accessToken', accessToken, { httpOnly: true });

  //   return user;
  // }

  //Update a user
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: CreateUserDto,
  ): Promise<User> {
    return this.service.update(id, dto);
  }

  //Delete a user
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.service.delete(id);
  }
}
