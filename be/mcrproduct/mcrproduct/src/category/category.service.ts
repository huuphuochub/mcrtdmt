import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { Subcategory } from './subcategory.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private cateRepo:Repository<Category>,
        @InjectRepository(Subcategory)
        private SubcateRepo:Repository<Subcategory>
    ){}

    async GetAllCate(){
        const result = await this.cateRepo.find();
        if(!result){
            return({success:false,data:null,message:"khong co danh muc"})
        }
        // console.log(result);
        
        return {
            success:true,
            data:result
        };
    }
    async Getcategorybyid(id:number){
        // console.log(id);
        
        try {
            const result = await this.cateRepo.findOne({where:{id:id}})
        if(!result){
            return{
                success:false,
                message:"khon tim thay dam=nh muc",
                data:null
            }
        }
        return{
            success:true,
            data:result,
        }
        } catch (error) {
            return{
                success:false,
                message:'loi server',
                data:null,
            }
        }
    }



    async Getsubcatebyidcategory(id:number){
        const result = await this.SubcateRepo.find({where:{categoryId:id}});
        if(result){
            return({success:true,data:result})
        }
    }
    async getsubcategorybyid(id:number){
        try {
            const result = await this.SubcateRepo.findOne({where:{id:id}});
        if(!result){
            return {
                success:false,
                message:"khong tim thay danh muc con",
                data:null
            }
        }
        return {
        success:true,
        data:result,
      }
        } catch (error) {
                return {
                    success:false,
                    message:'loi',
                    data:null,
                }
        }
        
    }

    // async getallcategory() {
    //     try {
    //         const result = await this.SubcateRepo.find();
    //         if(!result){
    //             return{
    //                 success:false,
    //                 message:'khong co danh muc nao',
    //                 data:null,
    //             }
    //         }
    //         return{
    //             success:true,
    //             data:result,
    //         }
    //     } catch (error) {
    //         return{
    //             success:false,
    //             message:'loi',
    //             data:null,
    //         }
    //     }
    // }
}
