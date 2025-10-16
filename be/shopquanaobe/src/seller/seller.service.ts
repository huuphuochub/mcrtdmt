// users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './seller.entity';
import { In, Repository } from 'typeorm';
import { CommentSeller } from './commentseller.entity';

@Injectable()
export class SellerService {
    constructor(
        @InjectRepository(Seller)
        private sellerRepo:Repository<Seller>,
        @InjectRepository(CommentSeller)
        private CmtsellerRepo:Repository<CommentSeller>,
    ){}
  async Registerseller(user_id:number,usernameseller:string,  email:string, provinceId:number, districtId:number, wardsId:number, address:string){
    const newUser = this.sellerRepo.create({
        user_id,usernameseller,email,provinceId,districtId,wardsId,address,status:0
    });
    const result =  await this.sellerRepo.save(newUser);
    return result;
  }
  async Getsellerbyiduser(id:number){
    try {
      const seller = await this.sellerRepo.findOne({where:{id:id}});
      if (!seller) {
      return {
        success: false,
        message: 'Người dùng này chưa là seller',
        data: null,
      };
    }

    return {
      success: true,
      data: seller,
    };

    } catch (error) {
      return {
      success: false,
      message: 'Lỗi khi lấy thông tin seller',
      data: null,
    };
    }
  }

// lay mang seller tu mang id user
  async Inforsellers(ids:number[]) :Promise<Seller[]>{  
      return await this.sellerRepo.find({
        where:{id:In(ids)}
      });
      
  }

  //  lay 1 seller tu id user
  async Inforseller(id:number){
    try {
      const seller =  await this.sellerRepo.findOne({where:{user_id:id}})
      if(!seller){
        return{
        success :false,
        data:seller
      }
      }
      return{
        success :true,
        data:seller
      }
    } catch (error) {
      return {
      success: false,
      message: 'Lỗi khi lấy thông tin seller',
      data: null,
    };
    }

  }

  async GetAllSeller(){
    try {
       const sellers = await this.sellerRepo.find()
       return{
        success:true,
        data:sellers,
        message:'ok'
       }
    } catch (error) {
      return{
        success:false,
        message:'loi service'
      }
    }
  }

  async UpdateTotalSold(body:any){
const totalquantity = body.variant.reduce(
    (total, item) => total + item.quantity,
    0
  );
    try {
    await this.sellerRepo.increment(
      { id: body.seller_id }, // điều kiện where
      "soldCount",            // cột cần tăng
      totalquantity           // số lượng cần tăng
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
    
  }

async AddCmtSeller(body: any) {

  const cmt = this.CmtsellerRepo.create({
    content: body.content,
    star: Number(body.star),
    imageurl: body.imageurl,
    seller: { id: Number(body.seller_id) }, // ✅ quan hệ đúng
    user: { id: Number(body.user_id) },     // ✅ quan hệ đúng
  });

  try {
    const add = await this.CmtsellerRepo.save(cmt);
    const seller = await this.sellerRepo.findOne({
      where:{id:body.seller_id},
    })
    if(!seller){
      return{
        success:false,
        message:'khong tim thay seller',
        data:null,
      }
    }
    seller.ratingSum = (seller.ratingSum || 0) + Number(body.star)
    seller.ratingCount = (seller.ratingCount || 0) + 1;

    await this.sellerRepo.save(seller);

    
    return {
      success: true,
      message: 'ok',
      data: add,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}


async GetCmtSeller(seller_id: number, page: number, star: number) {
  const take = 12;
  const skip = (page - 1) * take;
  
  try {
    const where: any = {
      seller: { id: seller_id },
    };

    // Nếu star khác 0 thì thêm điều kiện
    if (Number(star) !== 0) {
      where.star = Number(star);
    }

    const cmt = await this.CmtsellerRepo.find({
      where,
      take,
      skip,
      relations: ['user'],
    });

    return {
      success: true,
      message: 'ok',
      data: cmt,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error,
    };
  }
}

async SearchName(keyword:string){
  try {
    const [seller,total] =await this.sellerRepo
    .createQueryBuilder('seller')
    .where(
        `unaccent(lower(seller.usernameseller)) LIKE unaccent(lower(:keyword))`,
         { keyword: `%${keyword}%` },

    )
    .orderBy('seller.id', 'DESC')
    .getManyAndCount();

    return {
      success:true,
      data:seller
    }
  } catch (error) {
    console.log(error.message);
    
    return{
      success:false,
      data:null,
      message:'loi service'
    }
  }
}


}
