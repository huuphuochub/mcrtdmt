// users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './seller.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellerService {
    constructor(
        @InjectRepository(Seller)
        private sellerRepo:Repository<Seller>,
    ){}
  async Registerseller(usernameseller:string,  email:string, provinceId:number, districtId:number, wardsId:number, address:string){
    const newUser = this.sellerRepo.create({
        usernameseller,email,provinceId,districtId,wardsId,address,status:0
    });
    const result =  await this.sellerRepo.save(newUser);
    console.log("nha ban hang" + result);
    return result;
    
  }
}
