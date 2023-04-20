import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // change to Postgres
      host: 'localhost',
      username: 'user',
      password: 'password',
      database: 'chapabc',
      port: 5432, // change port to default Postgres port
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
