import { SellerInterface } from "./seller.interface";

export interface    OrderInterface{
    id:number;
    user_id:number;
    ordercode:number;
    total_amount:number;
    phone:string;
    note:string;
    address:string;
    status:number;
    email:string | null;
    created_at:string;
    updated_at:string;
    payment_method:number;
    ship_fee:number;
    payable_amount:number;

}

export interface OrderItemInterface {
    id:number;
    id_product:number;
    seller_id:number;
    quantity:number;
    unitprice:number;
    productname:string;
    color_id:number;
    size_id:number;
    status:number;
    seller:SellerInterface;
    

}