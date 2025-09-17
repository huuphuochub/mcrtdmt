import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('createpaymentlink')
    async createPaymentLink(@Body() orderInfo: any) {
        const paymentLink = await this.orderService.createPaymentLink(orderInfo);
        return { paymentLink };
    }

    // @Post('confirm')
    // async confirmOrder(@Body() confirmationInfo: any) {
    //     const result = await this.orderService.confirmOrder(confirmationInfo);
    //     return { result };
    // }

    @Post('checkordercode')
    async checkOrder(@Body() ordercode: any) {
        const result = await this.orderService.checkOrder(ordercode.ordercode);
        return { result };
    }

    @UseGuards(JwtAuthGuardFromCookie)
    @Post('createorder')
    async createorder(@Body() body:any, @GetUser() user:any){
        // console.log('hahahaha');
        // console.log(body);
        // console.log(user);
        
        
        
        return await this.orderService.Createorder(user.id,body)
    }

    @UseGuards(JwtAuthGuardFromCookie)
    @Get('getorderitem/:ordercode')
    async Getorderitem(@GetUser() user:any,   @Param('ordercode') ordercode: number
            ){
        // console.log(user);
        // console.log(user);
        
        
        
        return await this.orderService.Getorderitem(user.id,ordercode)
    }

    @Post('updatestatus')
    async Updatestatusorder(@Body() body:any){
        // console.log(body);
        
        return await this.orderService.updatestatus(Number(body.ordercode),body.status,Number(body.payable_amount));
    }   
     

    @UseGuards(JwtAuthGuardFromCookie)
    @Get('getorderitembyid/:id')
    async GetorderitembyId(@Param('id') id:number,@GetUser() user:any)
    {
        return await this.orderService.Getorderitembyid(user.id,id);
    }

    @UseGuards(JwtAuthGuardFromCookie)
   @Get('getallorder/:page/:status?')
            async Getallorder(
            @GetUser() user: any,
            @Param('page') page: string,
            @Param('status') status?: string,
            @Query('month') month?:string
            ) {
            const parsedPage = Number(page);
            const parsedStatus =
                status !== undefined &&
                status !== 'undefined' &&
                !isNaN(Number(status))
                ? Number(status)
                : undefined;

                const parsedMonth =
                month !== undefined && month !== 'undefined' ? month : undefined;

            return this.orderService.getallorder(user.id, parsedPage, parsedStatus,parsedMonth);
            }


        @Post('updateordermail')
    async updateordermail(@Body() body:any) {
        console.log(body);
        
        return await this.orderService.updateordermail(Number(body.id))
    }


    // check xem sản phẩm đã mua từ user này chưa
    @UseGuards(JwtAuthGuardFromCookie)
    @Get('hasbought/:product_id')
    async hasBought(@Param('product_id') product_id:number , @GetUser() user:any){
        // console.log("da gọi has bó");
        console.log(user);
        console.log(product_id);
        
        
        const haha = await this.orderService.HasBought(user.id,product_id);
        console.log(haha);
        return haha
        
    }

    }



