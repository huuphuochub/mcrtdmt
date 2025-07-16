import { Body, Controller, Post } from '@nestjs/common';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
constructor( private sellerservice:SellerService){}

@Post('register')
async Registerseller(
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
    return this.sellerservice.Registerseller(body.usernameseller,body.email,body.provinceId,body.districtId,body.wardId,body.address);
}

}
