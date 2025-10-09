import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtSellerAuthGuardFromCookie } from "src/auth/seller-jwt.guard";
import { GetSeller } from "src/common/decorators/get-seller.decorator";


@Controller('noti')
export class Notification{
    constructor(
            private readonly httpService: HttpService,
    
            
        ){
    
        }

        // khi ng dung mua hang thi thong bao seller
        @Post('addnoti')
        async AddNotiSeller(@Body() body:any){
            console.log(body);
            
            try {
                const add:any = await this.httpService.post('http://localhost:3004/noti/addnoti',body).toPromise();
                return add.data
            } catch (error) {
                return{
                    success:false,
                    data:null,
                    message:error,
                }
            }
        }

        @UseGuards(JwtSellerAuthGuardFromCookie) 
        @Get('notiseller')
        async GetNotiSeller(@GetSeller() seller:any){
            if(!seller){
                return{
                    success:false,
                    data:null,
                    message:'ban k phau seller',
                }
            }

            try {
                const data:any = await this.httpService.get(`http://localhost:3004/noti/notiseller/${seller.seller_id}`).toPromise()

                return data.data
             } catch (error) {
                return{
                    success:false,
                    message:error,
                    data:null,
                }
            }
        }
        



}