import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { PayOS } from '@payos/node';
import { Order } from './order.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './orderitem.entity';


@Injectable()
export class OrderService {
  private payos: PayOS;

  constructor(
    @InjectRepository(Order)
    private orderRepo:Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepo:Repository<OrderItem>,
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
    console.log('tao order');
    
    console.log(body);
    
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
// lấy orderitem theo user
      async Getorderitembyid (user_id:number,id:number){
      // console.log("hahaha ỏdercode" , ordercode);
      
    try {
        const order = await this.orderRepo.findOne({
          where:{user_id,id},
          relations :["items","user","items.seller"],
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

       await this.orderItemRepo
      .createQueryBuilder()
      .update("orderitem")
      .set({ status: status }) // hoặc status từ param nếu muốn đồng bộ
      .where("order_id = :orderId", { orderId: order.id })
      .execute();
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

// láy order thep user
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


// khi gửi mail thì true
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
      .andWhere('item.status = :status',{status:3})
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


  // xem order của user với shop có chưa để bl
  async GetOrderByUserWithSeller(user_id:number,seller_id:number){
   try {
     const lastorder = await this.orderRepo
     .createQueryBuilder('order')
      .leftJoinAndSelect(
       "order.items",
       "orderItem",
       "orderItem.seller_id = :seller_id",
       { seller_id }
     )
     .where('order.user_id = :user_id',{user_id})
     .andWhere('orderItem.seller_id = :seller_id',{seller_id})
     .orderBy('order.created_at','DESC')
     .getOne()  // neeu lays 1
     // .getMany() neu muon laays nhieeuf

     if(lastorder){
       return{
      success:true,
      data:lastorder,
      message:'ok'
     }
     }
     return{
      success:false,
      data:lastorder,
      message:'ok'
     }
   } catch (error) {
    return{
      success:false,
      data:null,
      message:error.message
    }
   }
  }




  // lấy orderitem dựa theo seller và set limit, page, month hoặc năm
  async getOrderItemsBySeller(
  sellerId: number,
  page: number = 1,
  limit: number = 10,
  month?: number,
  year?: number
) {
  const qb = this.orderItemRepo
    .createQueryBuilder("item")
    .leftJoinAndSelect("item.order", "order")
    .leftJoin("item.seller", "seller")
    .where("item.seller_id = :sellerId", { sellerId })
    .andWhere("order.status >= 1");

  // filter theo tháng + năm
  if (month && year) {
    qb.andWhere("EXTRACT(MONTH FROM item.updated_at) = :month", { month })
      .andWhere("EXTRACT(YEAR FROM item.updated_at) = :year", { year });
  } else if (year) {
    qb.andWhere("EXTRACT(YEAR FROM item.updated_at) = :year", { year });
  }

  // phân trang
  qb.skip((page - 1) * limit).take(limit);

  // sort mới nhất trước
  qb.orderBy("item.updated_at", "DESC");

  const [items, total] = await qb.getManyAndCount();

  // nhóm theo order_id
  const grouped = items.reduce((acc, item) => {
    const orderId = item.order.id;

    if (!acc[orderId]) {
      acc[orderId] = {
        order: item.order,
        items: [],
      };
    }

    acc[orderId].items.push(item);
    return acc;
  }, {} as Record<number, { order: any; items: OrderItem[] }>);

  return {
    success: true,
    data: Object.values(grouped),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// lay order detail theo seller
async OrderDetailSeller(body: any) {
  try {
    const { order_id, seller_id } = body;

    const order = await this.orderRepo
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.items", "item")
      .leftJoinAndSelect("item.seller", "seller")
      .leftJoinAndSelect("order.user","user")
      .where("order.id = :orderId", { orderId: order_id })
      .andWhere("item.seller_id = :sellerId", { sellerId: seller_id })
      
      .getOne();

    return {
      success: true,
      data: order,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}


// đếm số order theo seller trong tháng hoặc năm
async countOrdersBySeller(
  sellerId: number,
  month?: number,
  year?: number
) {
  const qb = this.orderItemRepo
    .createQueryBuilder("item")
    .innerJoin("item.order", "order")
    .where("item.seller_id = :sellerId", { sellerId })
    .andWhere("item.status = :status",{status:3})

  if (month && year) {
    qb.andWhere("EXTRACT(MONTH FROM order.created_at) = :month", { month })
      .andWhere("EXTRACT(YEAR FROM order.created_at) = :year", { year });
  } else if (year) {
    qb.andWhere("EXTRACT(YEAR FROM order.created_at) = :year", { year });
  }

  // Đếm DISTINCT order_id
  try {
    const count = await qb
    .select("COUNT(DISTINCT item.order_id)", "count")
    .getRawOne();

     return {
    success: true,
    message:'ok',
    data: Number(count.count) || 0,
  };

  } catch (error) {
    
  }
 
}

// cap nhat don hang item dua theo seller
async UpdateStatusOrderItemBySeller(order_id:number,seller_id:number,status:number,cancelReason:string){
  try {
    const up = await this.orderItemRepo.update({
      
      order:{id:order_id},
      seller:{id:seller_id},
    },
    {status:status ,cancel_reason:cancelReason}
  )

  return{
    success:true,
    message:'ok',
    data:up
  }
  } catch (error) {
    return{
      success:false,
      message:'loi',
      data:null,
    }
  }
}

// đếm số khách hàng mới theo seller và tháng năm
async countNewCustomers(month: number, year: number, sellerId: number) {
  const startOfMonth = `${year}-${month.toString().padStart(2, "0")}-01`;
  const endOfMonth =
    month === 12
      ? `${year + 1}-01-01`
      : `${year}-${(month + 1).toString().padStart(2, "0")}-01`;

  // Subquery: lấy user_id + đơn hàng đầu tiên
  const subQb = this.orderRepo
    .createQueryBuilder("o")
    .innerJoin("o.items", "item")
    .where("item.seller_id = :sellerId", { sellerId })
    .andWhere("item.status = :status", { status: 3 }) // chỉ lấy đơn hoàn thành
    .groupBy("o.user_id")
    .having("MIN(o.created_at) >= :startOfMonth", { startOfMonth })
    .andHaving("MIN(o.created_at) < :endOfMonth", { endOfMonth })
    .select("o.user_id") // chỉ cần user_id
    .addSelect("MIN(o.created_at)", "first_order_date");

  // Wrap lại để count
  try {
    const result = await this.orderRepo
    .createQueryBuilder()
    .select("COUNT(*)", "new_customers")
    .from("(" + subQb.getQuery() + ")", "sub")
    .setParameters(subQb.getParameters())
    .getRawOne();

      return{
        success:true,
        message:'ok',
        data:Number(result.new_customers) || 0
      } 

  } catch (error) {
    
  }
}
// dem doanh thu dụa theo seller và nam thang
async getRevenueBySeller(sellerId: number, month?: number, year?: number) {
  const qb = this.orderItemRepo
    .createQueryBuilder("item")
    .innerJoin("item.order", "o")
    .where("item.seller_id = :sellerId", { sellerId })
    .andWhere("item.status = :status", { status: 3 }) // chỉ tính đơn hoàn thành
    .select("COALESCE(SUM(item.quantity * item.unitprice), 0)", "revenue");

  // lọc theo tháng + năm
  if (month && year) {
    qb.andWhere("EXTRACT(MONTH FROM o.created_at) = :month", { month })
      .andWhere("EXTRACT(YEAR FROM o.created_at) = :year", { year });
  } else if (year) {
    qb.andWhere("EXTRACT(YEAR FROM o.created_at) = :year", { year });
  }

  try {
    const result = await qb.getRawOne();
      return {
        success:true,
        data:Number(result.revenue) || 0,
        message:'ok',
      }

  } catch (error) {
    
  }
}


// dem tong san pham

async countTotalProductsBySeller(sellerId: number, month?: number, year?: number) {
  const qb = this.orderItemRepo
    .createQueryBuilder("item")
    .innerJoin("item.order", "o")
    .where("item.seller_id = :sellerId", { sellerId })
    .andWhere("item.status = :status", { status: 3 }) // chỉ tính đơn hoàn thành
    .select("COALESCE(SUM(item.quantity), 0)", "totalProducts");

  // lọc theo tháng + năm
  if (month && year) {
    qb.andWhere("EXTRACT(MONTH FROM o.created_at) = :month", { month })
      .andWhere("EXTRACT(YEAR FROM o.created_at) = :year", { year });
  } else if (year) {
    qb.andWhere("EXTRACT(YEAR FROM o.created_at) = :year", { year });
  }

  try {
    const result = await qb.getRawOne();
      return {
        data: Number(result.totalProducts) || 0,
      success:true,
      message:'ok'
      }

  } catch (error) {
    
  }
}

// tinh doashboard doanh thu
async getDailyStats(sellerId: number, month: number, year: number) {
  const qb = this.orderItemRepo
    .createQueryBuilder("item")
    .innerJoin("item.order", "o")
    .where("item.seller_id = :sellerId", { sellerId })
    .andWhere("item.status = :status", { status: 3 }) // chỉ tính đơn hoàn thành
    .andWhere("EXTRACT(MONTH FROM item.updated_at) = :month", { month })
    .andWhere("EXTRACT(YEAR FROM item.updated_at) = :year", { year })
    .select("TO_CHAR(item.updated_at, 'YYYY-MM-DD')", "day")
    .addSelect("COUNT(DISTINCT o.id)", "totalOrders")
    .addSelect("COALESCE(SUM(item.quantity * item.unitprice), 0)", "revenue")
    .groupBy("TO_CHAR(item.updated_at, 'YYYY-MM-DD')")
    .orderBy("day", "ASC");

    // console.log(qb);
    

  const results = await qb.getRawMany();

  return results.map(r => ({
    day: r.day,                          // ngày (yyyy-mm-dd)
    totalOrders: Number(r.totalOrders),  // số đơn trong ngày
    revenue: Number(r.revenue),          // doanh thu trong ngày
  }));
}
// lấy top 10 sản phẩm bán chạy
async getTopSellingProducts(sellerId: number, month?: number, year?: number,limit?:number) {
  console.log(limit);
  
  const qb = this.orderItemRepo
    .createQueryBuilder("item")
    .innerJoin("item.order", "order")
    .where("item.seller_id = :sellerId", { sellerId })
    .andWhere("item.status = :status", { status: 3 }) // chỉ tính đơn đã hoàn thành

  .andWhere("EXTRACT(MONTH FROM item.updated_at) = :month", { month })
    .andWhere("EXTRACT(YEAR FROM item.updated_at) = :year", { year })

  const topProducts = await qb
    .select("item.id_product", "productId")
    .addSelect("item.productname", "productName")
    .addSelect("SUM(item.quantity)", "totalSold")
    .groupBy("item.id_product")
    .addGroupBy("item.productname")
    .orderBy("SUM(item.quantity)", "DESC")
    .limit(limit ? limit: 10)
    .getRawMany();

    // console.log(topProducts);
    

  return topProducts.map(p => ({
    productId: p.productId,
    productName: p.productName,
    totalSold: Number(p.totalSold),
  }));
}

// tính doanh thu của top 10 sản phẩm cao nhất

async getTopdoanhthuProducts(sellerId: number, month?: number, year?: number) {
  const qb = this.orderItemRepo
    .createQueryBuilder("item")
    .innerJoin("item.order", "order")
    .where("item.seller_id = :sellerId", { sellerId })
    .andWhere("item.status = :status", { status: 3 }) // chỉ tính đơn đã hoàn thành

  .andWhere("EXTRACT(MONTH FROM item.updated_at) = :month", { month })
    .andWhere("EXTRACT(YEAR FROM item.updated_at) = :year", { year })

  const topProducts = await qb
    .select("item.id_product", "productId")
    .addSelect("item.productname", "productName")
    .addSelect("SUM(item.quantity)", "totalSold")

    .addSelect("SUM(item.quantity * item.unitprice)", "totalprice")
    .groupBy("item.id_product")
    .addGroupBy("item.productname")
    .orderBy("SUM(item.quantity)", "DESC")
    .limit(10)
    .getRawMany();

    console.log(topProducts);
    

  return topProducts.map(p => ({
    productId: p.productId,
    productName: p.productName,
    tongdoanhthu: Number(p.totalprice),
    soluong:Number(p.totalSold),
  }));
}

}
