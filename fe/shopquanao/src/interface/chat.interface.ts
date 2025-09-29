import { interfaceuser } from "./user.interface";
import  { interfaceProduct } from "./product.interface";
import { SellerInterface } from "./seller.interface";
export interface Chatroominterface{
    id:number;
    user:interfaceuser;
    seller:SellerInterface;
    lastmessage:string;
    status:number;
    date:string

}

export interface ChatIteminterface{
    id:number;
    room:number;
    user:{id:number} | null;
    seller:{id:number} | null;
    message:string;
    status:number;
    createdAt:string;
    imageurl:string[] | null;
    tag:{
        id:number,
        image:string,
        name:string
    };
}