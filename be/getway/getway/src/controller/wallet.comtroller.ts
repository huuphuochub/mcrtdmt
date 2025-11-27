import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { JwtSellerAuthGuardFromCookie } from "src/auth/seller-jwt.guard";
import { GetSeller } from "src/common/decorators/get-seller.decorator";

const urluser = 'http://localhost:3004'


@Controller('wallet')
export class WalletController {
    constructor(        private readonly httpService: HttpService,
    ){}

    @UseGuards(JwtSellerAuthGuardFromCookie)
    @Get('getwallet')
    async GetWallet(@GetSeller() seller:any){
        if(!seller) {
            return{
                success:false,
                data:null,
                message:'k phai seller',
            }
        }

        try {
            const data:any = await firstValueFrom(this.httpService.get(`${urluser}/wallet/getwallet/${seller.seller_id}`))
            return{
                data:data.data,
                success:true,
                message:'thanh cong'
            }
        } catch (error) {
            return{
                success:false,
                message:error.message,
                data:null,
            }
        }
    }


    @Post('addbank')
    async AddBank(@Body() body:any){
        try {
            const data:any = await this.httpService.post(`${urluser}/wallet/addbank`,body).toPromise();
            return data.data
        } catch (error) {
            return{
                success:false,
                data:null,
                message:'loi gateway'
            }
        }
    }

    @Post('deposit')
    async Deposit(@Body() body:any){
        try {
            const data:any = await firstValueFrom(
                this.httpService.post(`${urluser}/wallet/deposit`,body)
            )
            return data.data
        } catch (error) {
            return{
                success:false,
                data:null,
                message:'loi gateway' + error.message,
            }
        }
    }

     @Post('withdraw')
    async Withdraw(@Body() body:any){
        try {
            const data:any = await firstValueFrom(
                this.httpService.post(`${urluser}/wallet/withdraw`,body)
            )
            return data.data
        } catch (error) {
            return{
                success:false,
                data:null,
                message:'loi gateway' + error.message,
            }
        }
    }


    @UseGuards(JwtSellerAuthGuardFromCookie)
    @Get('gethistory')
    async GetHistory(@GetSeller() seller:any){
        if(!seller){
            return{
                success:false,
                data:null,
                message:'k phai seller',
            }
        }
        try {   
            const data:any = await firstValueFrom(
                this.httpService.get(`${urluser}/wallet/gethistory/${seller.seller_id}`)
            )
            return data.data
        } catch (error) {
            return{
                success:false,
                data:null,
                message:'loi gateway' + error.message,
            }
        }
    }
    @Post('deletebank')
    async DeleteBank(@Body() body:any){
        try {
            const data:any = await firstValueFrom(
                this.httpService.post(`${urluser}/wallet/deletebank`,body)
            )
            return data.data
        } catch (error) {
            return{
                success:false,
                data:null,
                message:'loi gateway' + error.message,
            }
        }
    }

     


}
