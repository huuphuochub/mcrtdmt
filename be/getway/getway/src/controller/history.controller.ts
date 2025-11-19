import { Controller, Post, Body, Res, HttpStatus, Get, Req, UseGuards, Delete } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';


import { firstValueFrom } from 'rxjs';
// const urluser = '${urluser}'
const urlproduct = 'http://localhost:3002'
interface RequestWithCookies extends Request {
  cookies: Record<string, string>;
}
@Controller('history')
export class HistoryController {
  constructor(private readonly httpService: HttpService) {}

   @Post('addkeyword')
   async AddKeyword(@Body() body:any,@Req() req:RequestWithCookies ){
      const token = req.cookies?.access_token;


            if (!token) {
                return {
                    success:false,
                    message:'chua dang nhap',
                    data:null,
                    code:404
                }
            }

            try {
                const {data} = await firstValueFrom(
                    // this.httpService.post('http://localhost:3002/historysearch/add',body,{
                                        this.httpService.post(`${urlproduct}/historysearch/add`,body,{

                        headers:{
                            Authorization:`Bearer ${token}`,
                        }
                    })
                )
                return data
            } catch (error) {
                return {
                    success: false,
                    message: error.response?.data?.message || error.message,
                    code: error.response?.status || 500,
                    };
            }


   }

}


