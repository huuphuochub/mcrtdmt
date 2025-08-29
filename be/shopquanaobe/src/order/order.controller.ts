import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

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
    }
