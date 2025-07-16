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
        if(result){
            return({success:true,result})
        }
    }

    async Getsubcatebyid(id:number){
        const result = await this.SubcateRepo.find({where:{categoryId:id}});
        if(result){
            return({success:true,result})
        }
    }
}
