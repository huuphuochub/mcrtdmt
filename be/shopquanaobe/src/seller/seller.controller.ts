import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SellerService } from './seller.service';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('seller')
export class SellerController {
constructor( private sellerservice:SellerService){}


@UseGuards(JwtAuthGuardFromCookie)
@Post('register')
async Registerseller(
    @GetUser() user:any,
    @Body()
    body:{
        usernameseller:string;
        email:string,
        provinceId:number;
        districtId:number;
        wardId:number;
        address:string,
    },
){
    console.log(body);
    
    return this.sellerservice.Registerseller(user.id,body.usernameseller,body.email,body.provinceId,body.districtId,body.wardId,body.address);
}
    @Get('getseller/:id')
      async getuserbyid(@Param('id')id:number){
        return this.sellerservice.Getsellerbyiduser(id);
      } 


    //   lay thong tin seller tu mang id user
    @Post('inforseller')
    async inforsellers(@Body() ids:{sellerIds:number[]}){
        console.log(ids);
        
        return this.sellerservice.Inforsellers(ids.sellerIds);
    }

    // lay seller tu id user

    @Post('inforsellerbyuser')
    async inforseller(@Body() id:{user_id:number}){
        console.log(id.user_id);
        
        return this.sellerservice.Inforseller(id.user_id);
    }

    // @Post('getseller')
    // async 


}
