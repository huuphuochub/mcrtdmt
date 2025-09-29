import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module'; // 👈 IMPORT NÀY
import { Notification } from 'src/noti/noti.entity';



@Module({
  imports: [TypeOrmModule.forFeature([User,Notification]),
  AuthModule,

],

  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
