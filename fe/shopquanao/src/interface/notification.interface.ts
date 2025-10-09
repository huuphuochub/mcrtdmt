export interface NotificationInterface{
    id:number,
    title:string,
    content:string,
    user_id:number | null,
    seller_id:number | null,
    isRead:boolean,
    createdAt:string,
    order_id:number,
}