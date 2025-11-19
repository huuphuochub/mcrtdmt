import { HttpService } from "@nestjs/axios";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuardFromCookie } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/common/decorators/get-user.decorator";
const urluser = 'http://localhost:3004'
// const urlproduct = '${urlproduct}'
@Controller('follower')
export class FolowerController {
    constructor(
        private readonly httpService: HttpService,
                        private authService : AuthService,

        
    ){

    }

   @UseGuards(JwtAuthGuardFromCookie)
    @Post('addfl')
    async AddFoloWer(@Body() body:any,@GetUser() user:any){
        
        const bodydata = {
            seller_id:body.seller_id,
            user_id:user.id
        }
        try { 
            // const fl:any = await this.httpService.post('http://localhost:3004/follower/addfl',bodydata).toPromise()
                        const fl:any = await this.httpService.post(`${urluser}/follower/addfl`,bodydata).toPromise()

            return fl.data
        } catch (error) {
            return{
                success:false
            }
        }
    }

    @UseGuards(JwtAuthGuardFromCookie)
    @Post('checkfl')
    async CheckFl(@Body() body:any,@GetUser() user:any){
        const bodydata = {
            seller_id:body.seller_id,
            user_id:user.id
        }
        try {
            // const fl:any = await this.httpService.post('http://localhost:3004/follower/checkfl',bodydata).toPromise()
                        const fl:any = await this.httpService.post(`${urluser}/follower/checkfl`,bodydata).toPromise()

            return fl.data
        } catch (error) {
            return{
                success:false
            }
        }
    }

        @UseGuards(JwtAuthGuardFromCookie)
    @Post('unfl')
    async UnFl(@Body() body:any,@GetUser() user:any){
        const bodydata = {
            seller_id:body.seller_id,
            user_id:user.id
        }
        try {
            // const fl:any = await this.httpService.post('http://localhost:3004/follower/unfl',bodydata).toPromise()
                        const fl:any = await this.httpService.post(`${urluser}/follower/unfl`,bodydata).toPromise()

            return fl.data
        } catch (error) {
            return{
                success:false
            }
        }
    } 


}