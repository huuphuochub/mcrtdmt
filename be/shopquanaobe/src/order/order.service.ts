import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { PayOS } from '@payos/node';

@Injectable()
export class OrderService {
  private payos: PayOS;

  constructor() {
    const payos = new PayOS({
  clientId: process.env.PAYOS_CLIENT_ID,
  apiKey: process.env.PAYOS_API_KEY,
  checksumKey: process.env.PAYOS_CHECKSUM_KEY
});

this.payos = payos;
  }

  async createPaymentLink(orderInfo: any) {
    const paymentLink = await this.payos.paymentRequests.create(orderInfo);
        console.log(this.payos.paymentRequests);

    return paymentLink;
    
  }

  async checkOrder(ordercode: any) {
    console.log(ordercode);
    
   return  await this.payos.paymentRequests.get(ordercode);
  }
}
