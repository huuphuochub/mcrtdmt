import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatItem } from './chatitem.entity';
import { Roomchat } from './chat.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([ChatItem, Roomchat]),
  AuthModule

],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
