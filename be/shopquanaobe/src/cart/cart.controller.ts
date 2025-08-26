import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';



@Controller('cart')
export class CartController {
    constructor(
        private cartservice:CartService,
    ){

    }
    @UseGuards(JwtAuthGuardFromCookie)
    @Post('addcart')
    async Add(@GetUser() user:any,
        @Body()
        body:{
            cart_id:number,
            size_id:number,
            product_id:number,
            color_id:number,
            quantity:number,
        },

    ){
        // console.log(user);
        
        return await this.cartservice.Addcart(user.id,body)
        
    }

    @UseGuards(JwtAuthGuardFromCookie)
    @Get('getcartitembyiduser')
    async Getallcartitem(@GetUser() user:any){
        if(!user){
            return{
                success:false,
                message:'vui long dang nhap',
                data:null
            }
        }
        return await this.cartservice.Getallcartitem(user.id)
    }
    
}
