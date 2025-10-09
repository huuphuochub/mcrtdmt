export interface SellerInterface{
    id:number;
    user_id:number;
    usernameseller:string;
    email:string;
    districtId:number;
    provinceId:number;
    wardsId:number;
    address:string;
    urlfb:string;
    urltiktok:string;
    describe:string;
    phone:string;
    createdAt:string;
    status:number;
    // tổng số lượt đánh giá
    ratingCount:number;
    //tổng số sao đánh giá
    ratingSum:number;
    avatar:string;
    soldCount:number;
    follower:number;
    totalproduct:number;
}

interface CommentsellerInterface{
    id:number;
    user_id:number;
    content:string;
    star:number;
    createdAt:string;
}