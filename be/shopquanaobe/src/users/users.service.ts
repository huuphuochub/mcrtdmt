// users.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheModule } from '@nestjs/cache-manager';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo:Repository<User>,
        private jwtService:JwtService,

        
        @Inject(CACHE_MANAGER) private cache: Cache,
    ){}
  async Registersuser(username:string, password:string, phone:string, provinceId:number, districtId:number, wardsId:number,avatarUrl:string){
    const existingUser = await this.userRepo.findOne({where:{phone}});
    if(existingUser){
        return({ success:false,
            message:"sdt da duoc dang ki tai khoan khac"
        }
           
        )
    }

    const salt = await bcrypt.genSalt(10);
            const hashmk = await bcrypt.hash(password,salt);
    
    const newUser = this.userRepo.create({
        username,password:hashmk,phone,provinceId,districtId,wardsId,role:0
    });
        const result = await this.userRepo.save(newUser);
        return result;  
    }

    async LoginUser(phone:string,password:string){
        const existphone  = await this.userRepo.findOne({where:{phone}});
        if(!existphone){
            return({success:false,message:"so dien thoai khong ton tai"})
        }

        const match = await bcrypt.compare(password, existphone.password);
        if (!match) {
            return { success: false, message: "mat khau khong dung" };
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



        async SettingInfor(body:any){
            try {
                const updateinfor= await this.userRepo.update(body.id,{
                    ...body
                });
                return{
                    success:true,
                    data:updateinfor,
                    message:'ok',
                }
            } catch (error) {
                return{
                    success:false,
                    message:'error',
                }
            }
        }

        async ResetPassword(id:number,password:string,newpassword:string){
           try {
             const user = await this.userRepo.findOne({where:{id}});
            if(!user){
                return {success:false,message:"nguoi dung khong ton tai",data:null}
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return { success: false, message: "mat khau hien tai khong dung" ,data:null};
            }
            const salt = await bcrypt.genSalt(10);
            const hashmk = await bcrypt.hash(newpassword,salt);
            await this.userRepo.update(id,{password:hashmk});
            return {success:true,message:"doi mat khau thanh cong",data:null}
           } catch (error) {
               return {success:false,message:"doi mat khau khong thanh cong",data:null}
           }
        }
        async CheckMail(email:string){
            console.log(email);
            
            const user = await this.userRepo.findOne({where:{email}});
            if(!user){
                return {success:false,message:"email khong ton tai",data:null}
            }

            

            const code = Math.floor(100000 + Math.random() * 900000).toString();
            await (this.cache as any).set(`verify:${email}`, code, { ttl: 180 });


    


            return {success:true,message:"email ton tai",data:{email:email,code:code}}
        }

        async VerifyMail(email:string,code:string){
            const cachedCode = await (this.cache as any).get(`verify:${email}`);
            if(cachedCode !== code){
                return {success:false,message:"ma xac minh khong dung",data:null}
            }else{
                const user = await this.userRepo.findOne({where:{email}});
                if(!user){
                    return {success:false,message:"email khong ton tai",data:null}
                }
                return {success:true,message:"xac minh email thanh cong",data:user.email}

            }
        }

        async ResetPassViaEmail(email:string,newpassword:string){
            try {
                const user = await this.userRepo.findOne({where:{email}});
                if(!user){
                    return {success:false,message:"email khong ton tai",data:null}
                }
                const salt = await bcrypt.genSalt(10);
                const hashmk = await bcrypt.hash(newpassword,salt);
                await this.userRepo.update(user.id,{password:hashmk});
                return {success:true,message:"doi mat khau thanh cong",data:null}
            }
            catch (error) {
                return {success:false,message:"doi mat khau khong thanh cong",data:null}
            }
        }

}
