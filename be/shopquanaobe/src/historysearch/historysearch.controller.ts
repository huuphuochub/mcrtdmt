import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { HistorysearchService } from './historysearch.service';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('historysearch')
export class HistorysearchController {
    constructor(
        private historyservice:HistorysearchService,
    ){}

    @UseGuards(JwtAuthGuardFromCookie)
    @Post('add')
    async Addkeyword(@Body() body:any,@GetUser() user:any){
        const bodys = {
            user_id:user.id,
            keyword:body.keyword
        } 
        
        return await this.historyservice.AddKeyword(bodys);
    }   

     @UseGuards(JwtAuthGuardFromCookie)
    @Get('gethistorybyuser')
    async historyuser(@GetUser() user:any){
        // const bodys = {
        //     user_id:user.id,
        //     keyword:body.keyword
        // } 
        
        
        return await this.historyservice.Gethistorybyuser(user.id);
    }   

    @Delete('deletehistory/:id')
    async deletesearch(@Param('id') id:number){
        
        return await this.historyservice.Deletesearch(id);

    }

}
