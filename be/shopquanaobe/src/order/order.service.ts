import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { PayOS } from '@payos/node';
import { Order } from './order.entity';
import { Between, Repository } from 'typeorm';
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

    async updatestatus(ordercode:number,status:number,payable_amount:number){
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
      order.payable_amount= payable_amount;
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


    async getallorder(user_id: any, page: number,status?:number,month?:string) {
      try {
        const take = 15; // số bản ghi mỗi trang
        const skip = (page - 1) * take; // bỏ qua bao nhiêu bản ghi
          // console.log(status?.toString());
          
          const where: any = { user_id };
            if (status !== undefined) {
              where.status = status; // chỉ thêm nếu có
            }

            let startDate: Date | undefined;
          let endDate: Date | undefined;

           if (month) {
            const [year, m] = month.split('-').map(Number);
            startDate = new Date(year, m - 1, 1);
            endDate = new Date(year, m, 0, 23, 59, 59); // ngày cuối cùng trong tháng
          }
          console.log(month);
          

            const [orders, total] = await this.orderRepo.findAndCount({
              where: {
                ...where,
                ...(month
                  ? { created_at: Between(startDate, endDate) }
                  : {}),
              },
              take,
              skip,
              order: { created_at: 'DESC' },
            });

        if (!orders || orders.length === 0) {
          return {
            success: false,
            data: null,
            message: 'Không tìm thấy order',
          };
        }

        return {
          success: true,
          message: '',
          data: orders,
            
          
        };
      } catch (error) {
        return {
          success: false,
          message: error.message || 'Server error',
          data: null,
        };
      }
    }



  async updateordermail(id: number) {
    try {
      await this.orderRepo.update(
        { id },                 // điều kiện where
        { emailsend: true }     // dữ liệu update
      );

      return {
        success: true,
        message: 'Update email status thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Lỗi service',
      };
    }
  }

  // check xem user da mua san pham nay chua
  async HasBought(user_id:number,product_id:number){
    try {
      const hasbought = await this.orderRepo
      .createQueryBuilder('order')
      .innerJoin('order.items','item')
      .where('order.user_id = :user_id',{user_id})
      .andWhere('order.status = :status',{status:5})
      .andWhere('item.id_product = :product_id',{product_id})
      .getExists();
      return {
        success:true,
        data:hasbought,
        message:'da mua san pham'
      }
    } catch (error) {
      return {
        success:true,
        data:null,
        message:error
      }
    }
  }

}
