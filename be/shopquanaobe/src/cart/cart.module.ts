import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartController } from './cart.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CartItem } from './cartItem.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cart,CartItem]),
  AuthModule,

],
  controllers:[CartController],
  providers: [CartService]
})
export class CartModule {}
