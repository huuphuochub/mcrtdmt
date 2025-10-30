import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module'; // 👈 IMPORT NÀY
import { Notification } from 'src/noti/noti.entity';
import { CacheModule } from '@nestjs/cache-manager';



@Module({
  imports: [TypeOrmModule.forFeature([User,Notification]),
  AuthModule,
CacheModule.register({
      ttl: 180, // mặc định 5 phút
      max: 100, // tối đa 100 keys
    }),
],

  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
