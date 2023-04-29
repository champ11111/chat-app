import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
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
    AuthModule,
    ChatModule,
    MessageModule,
    RoomModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'api/auth/(.*)', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
