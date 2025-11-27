import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
    constructor(
        private walletService : WalletService,
    ){}

    @Get('getwallet/:idseller')
    async Getwallet(@Param('idseller') idseller:number){
        return await this.walletService.GetWallet(idseller)
    }

    @Post('addbank')
    async AddBank(@Body() body:any){
        return await this.walletService.AddBank(body);
    }

    @Post('deposit')
    async Deposit(@Body() body:any){
        return await this.walletService.Deposit(body);
    }

    @Post('withdraw')
    async Withdraw(@Body() body:any){
        return await this.walletService.Withdraw(body);
    }

    @Get('gethistory/:seller_id')
    async GetHistory(@Param('seller_id') seller_id:number){
        return await this.walletService.GetHistory(seller_id);
    }

    @Post('deletebank')
    async DeleteBank(@Body() body:any){
        return await this.walletService.DeleteBank(body);
    }

    
}
