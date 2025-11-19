import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuardFromCookie } from "src/auth/jwt-auth.guard";
import { JwtSellerAuthGuardFromCookie } from "src/auth/seller-jwt.guard";
import { GetSeller } from "src/common/decorators/get-seller.decorator";
import { GetUser } from "src/common/decorators/get-user.decorator";

const urluser = 'http://localhost:3004'
// const urlproduct = '${urlproduct}'
@Controller('noti')
export class Notification{
    constructor(
            private readonly httpService: HttpService,
    
            
        ){
    
        }

        // khi ng dung mua hang thi thong bao seller
        @Post('addnoti')
        async AddNotiSeller(@Body() body:any){
            
            try {
                // const add:any = await this.httpService.post('http://localhost:3004/noti/addnoti',body).toPromise();
                                const add:any = await this.httpService.post(`${urluser}/noti/addnoti`,body).toPromise();

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
                // const data:any = await this.httpService.get(`http://localhost:3004/noti/notiseller/${seller.seller_id}`).toPromise()
                                const data:any = await this.httpService.get(`${urluser}/noti/notiseller/${seller.seller_id}`).toPromise()


                return data.data
             } catch (error) {
                return{
                    success:false,
                    message:error,
                    data:null,
                }
            }
        }

        @UseGuards(JwtAuthGuardFromCookie)
        @Get('getnoti')
        async GetnotiUser(@GetUser() user:any){
            if(!user){
                return{
                    success:false,
                    data:null,
                    message:'ban k phau user',
                }
            }

            try {
                // const data:any = await this.httpService.get(`http://localhost:3004/noti/notiuser/${user.id}`).toPromise()
                                const data:any = await this.httpService.get(`${urluser}/noti/notiuser/${user.id}`).toPromise()


                return data.data
            } catch (error) {
                return{
                    success:false,
                    data:null,
                    message:error,
                }
            }
        }

        @Post('updatenoti/:id')
        async UpdateNotiUser(@Param('id') id:number){
            try {
                // const data:any = await this.httpService.post(`http://localhost:3004/noti/updatenoti/${id}`).toPromise()
                                const data:any = await this.httpService.post(`${urluser}/noti/updatenoti/${id}`).toPromise()


                return data.data
            } catch (error) {
                return{
                    success:false,
                    data:null,
                    message:error,
                }
            }

        }
        



}