export interface Comment{
    id:number;
    user_id:number;
    content:string;
    createAt:Date;
    product_id:number;
    star:number;
    imageurl:string[];
}