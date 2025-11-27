import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { History } from './hisstory.entity';
import { Bank } from './bank.entity';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Seller } from 'src/seller/seller.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Wallet,History,Bank,Seller])],
    controllers:[WalletController],
    providers:[WalletService],
})
export class WalletModule {}
