import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outbox } from './outbox.entity';
import { OutboxService } from './outbox.service';
import { OutboxController } from './outbox.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Outbox])],
    controllers: [OutboxController],
    providers: [OutboxService],
})
export class OutboxModule {
    
}
