import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Subcategory } from './subcategory.entity';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    urlimage:string;

   @OneToMany(() => Subcategory, (sub) => sub.category)
  subcategories: Subcategory[];
    


}