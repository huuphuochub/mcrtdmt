import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { PayOS } from '@payos/node';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class OrderService {
  private payos: PayOS;

  constructor(
    @InjectRepository(Order)
    private orderRepo:Repository<Order>,
  ) {
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
    
   try {
    const data = await this.payos.paymentRequests.get(ordercode);
    return {
      success:true,
      message:'thanh cong',
      data
    };
   } catch (error) {
    return{
      success:false,
      message:error,
      data:null
    }
   }
  }

  async Createorder(  user_id:number,body:any){
     const order = this.orderRepo.create({
    ...body,
    user_id, // gán thêm user_id vào order
  });

  // console.log(order);
  
  return await this.orderRepo.save(order);
  }
  // async Getallorderitem (user_id:number){
  //   try {
  //       const order = await this.orderRepo.findOne({
  //         where:{user_id},
  //         relations :["OrderItem"],
  //       })
  //       if(!order){
  //         return{
  //           success:false,
  //           message:'khong tim thay order',
  //           data:null
  //         }
  //       }
  //       return {
  //         success:true,
  //         message:'',
  //         data:order,
  //       }
  //   } catch (error) {
  //     return{
  //       success:false,
  //       data:null,
  //       message:error,
  //     }
  //   }
  // }

  // lấy orderitem theo ordercode
    async Getorderitem (user_id:number,ordercode:number){
      console.log("hahaha ỏdercode" , ordercode);
      
    try {
        const order = await this.orderRepo.findOne({
          where:{user_id,ordercode},
          relations :["items"],
        })
        if(!order){
          return{
            success:false,
            message:'khong tim thay order',
            data:null
          }
        }
        return {
          success:true,
          message:'',
          order,
        }
    } catch (error) {
      return{
        success:false,
        data:null,
        message:error,
      }
    }
  }
// lấy orderitem theo id_order
      async Getorderitembyid (user_id:number,id:number){
      // console.log("hahaha ỏdercode" , ordercode);
      
    try {
        const order = await this.orderRepo.findOne({
          where:{user_id,id},
          relations :["items"],
        })
        if(!order){
          return{
            success:false,
            message:'khong tim thay order',
            data:null
          }
        }
        return {
          success:true,
          message:'',
          order,
        }
    } catch (error) {
      return{
        success:false,
        data:null,
        message:error,
      }
    }
  }

    async updatestatus(ordercode:number,status:number){
      try {
        const order = await this.orderRepo.findOne({
          where:{ordercode},
        })
        if (!order) {
      return {
        success: false,
        message: 'Không tìm thấy đơn hàng',
        data: null,
      };
    }
      order.status = status;
      await this.orderRepo.save(order);
     return {
      success: true,
      message: 'Cập nhật trạng thái thành công',
      data: order,
    };
      } catch (error) {
         return {
      success: false,
      message: error,
      data: null,
    };
      }
    }


    async getallorder(user_id:any){
      try {
        const orders = await this.orderRepo.find({where : {user_id}})
        if(!orders){
          return{
            success:false,
            data:null,
            message:'khong tim thay order'
          }
        }
        return{
          success:true,
          message:'',
          orders
        }
      } catch (error) {
         return {
      success: false,
      message: error,
      data: null,
    };
      }
    }
}
