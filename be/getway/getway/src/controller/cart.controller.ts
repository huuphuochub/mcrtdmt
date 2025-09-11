import { Controller, Post, Body, Res, HttpStatus, Get, Req, UseGuards, Delete } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import { Response } from 'express';
// import { UnauthorizedException } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';
// import { GetUser } from 'src/common/decorators/get-user.decorator';
// import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
interface RequestWithCookies extends Request {
  cookies: Record<string, string>;
}
@Controller('cart')
export class Cartcontroller {
  constructor(private readonly httpService: HttpService) {}

    // @UseGuards(JwtAuthGuardFromCookie)
    @Post('addcart')
    async getprofile(
        @Req() req:RequestWithCookies,
        // @GetUser() user: any,
        @Body() body:{
            color_id:number,
            quantity:number,
            size_id:number,
            product_id:number,
        }
){
        const token = req.cookies.access_token;
        if(!token){
            return{
                success:false,
                message:"thong tin dang nhap da het han, vui long dang nhap lai",
                data:null,
            }
        }
       
       const {data} = await firstValueFrom(
        this.httpService.post(`http://localhost:3004/cart/addcart`,
            body,
            {headers:{
                Authorization:`Bearer ${token}`,
            }}

        )
       )

       return data;
       
    }
    @Get('getcartheader')
    async getcartheader(
        @Req() req:RequestWithCookies,
    ){
        const token = req.cookies.access_token;
        if(!token){
            return{
                success:false,
                message:'vui long dang nhap lai de xem gio hang',
                data:null
            }
        }
        const {data} = await firstValueFrom(
            this.httpService.get(`http://localhost:3004/cart/getcartitembyiduser`,
                {headers:{
                    Authorization:`Bearer ${token}`
                }}
            )
        )
        return data
    }

    @Post('getcartdetail')
    async getdetailcart(
        @Body() body : [{
            product_id:number,
            color_id:number,
            size_id:number
        }]
    ){

        const productIds = body.map(item => item.product_id);
        const sizeIds = body.map(item => item.size_id);
        const colorIds = body.map(item => item.color_id);
            
        const [products, sizes, colors] = await Promise.all([
            firstValueFrom(this.httpService.post(`http://localhost:3002/product/batch`, { ids: [...new Set(productIds)] })),
            firstValueFrom(this.httpService.post(`http://localhost:3002/size/batch`, { ids: [...new Set(sizeIds)] })),
            firstValueFrom(this.httpService.post(`http://localhost:3002/size/batchcolor`, { ids: [...new Set(colorIds)] })),
        ]);

        const productMap = new Map(products.data.map((p:any) =>[p.id,p]));
        const sizeMap = new Map(sizes.data.map((s: any) => [s.id, s]));
        const colorMap = new Map(colors.data.map((c: any) => [c.id, c]));
        

        const result = body.map(item => ({
                ...item,
                product: productMap.get(item.product_id),
                size: sizeMap.get(item.size_id),
                color: colorMap.get(item.color_id),
                }));

                
       return{
            success:true,
            data:result,
            message:'ok'
       }
        
         
    }

    @Post('updatecartitem')
    async Updatecart(@Req() req:RequestWithCookies, @Body() body:any){
       const token = req.cookies.access_token;
        if(!token){
            return{
                success:false,
                message:'vui long dang nhap lai de xem gio hang',
                data:null
            }
        }
        const {data} = await firstValueFrom(
            this.httpService.post(`http://localhost:3004/cart/updatecartdetail`,
                body,
                {headers:{
                    Authorization:`Bearer ${token}`
                }}
            )
        )
        return data
    }
    @Post('deletecart')
    async deletecartitem(@Req() req:RequestWithCookies){
        const token = req.cookies.access_token;
        if(!token){
            return{
                success:false,
                message:'vui long dang nhap lai de xem gio hang',
                data:null
            }
        }
        const {data} = await firstValueFrom(
            this.httpService.post(`http://localhost:3004/cart/deletecart`,
                {},
                {headers:{
                    Authorization:`Bearer ${token}`
                }}
            )
        )
        return data
    
    }

}


