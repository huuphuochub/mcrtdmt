// users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo:Repository<User>,
        private jwtService:JwtService
    ){}
  async Registersuser(username:string, password:string, phone:string, provinceId:number, districtId:number, wardsId:number){
    // console.log(username);
    const existingUser = await this.userRepo.findOne({where:{phone}});
    if(existingUser){
        return({ success:false,
            message:"sdt da duoc dang ki tai khoan khac"
        }
           
        )
    }
    
    const newUser = this.userRepo.create({
        username,password,phone,provinceId,districtId,wardsId,role:0
    });
        const result = await this.userRepo.save(newUser);
        console.log('Saved user:', result);
        return result;  
    }

    async LoginUser(phone:string,password:string){
        const existphone  = await this.userRepo.findOne({where:{phone}});
        if(!existphone){
            return({success:false,message:"so dien thoai khong ton tai"})
        }
        if(existphone.password !== password){
            return({success:false,message:"mat khau khong dung"})
        }
        // const payload = {sub:existphone.id,phone:existphone.phone};
        // const token = this.jwtService.sign(payload)
        return({success:true,message:"dang nhap thanh cong",user:existphone})
    }


    async GetuserById(id:number){
        const result = await this.userRepo.findOne({where:{id},
        
        select: [
      "id",
      "username",
      "email",
      "phone",
      "phoneorder",
      "address",
      "provinceId",
      "districtId",
      "wardsId",
      "avatarUrl",
    ],
        });
        if(!result){
            return({success:false,message:"khong tim thay nguoi dung"})
        }
        return({success:true,message:"tim thay nguoi dung",data:result})
    }

     async findById(id: number) {
    return this.userRepo.find({where:{id},
        // relations:[seller]
    });
  }

        async updateProfile(id:number,updateData){
            try {
                await this.userRepo.update(id, updateData);
                return { success: true, message: "Cập nhật thông tin thành công" ,data:null};
            } catch (error) {
                return { success: false, message: "Cập nhật thông tin thất bại" ,data:null};
            }
        }

        async InForUsers(ids:number[]){
            return await this.userRepo.find({
                where:{id:In(ids)}
            })
        }
}
