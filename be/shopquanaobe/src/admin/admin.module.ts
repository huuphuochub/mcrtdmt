import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Admin } from './admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports:[TypeOrmModule.forFeature([Admin]),
    AuthModule
],
controllers:[AdminController],
providers:[AdminService]
})
export class AdminModule {
    
}
