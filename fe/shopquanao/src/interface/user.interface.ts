export interface interfaceuser{
    id:number,
    email:string,
    username:string,
    password:string,
    isActive:boolean,
    avatarUrl:string,
    role:number,
    districtId:number,
    provinceId:number,
    wardsId:number,
    address:string,
    createdAt:Date,
    phone:number,
    phoneorder:string,
}
// export interface interfaceSeller{
//      id:number;
//     user_id:number;
//     usernameseller:string;
//     email:string;
//     districtId:number;
//     provinceId:number;
//     wardsId:number;
//     address:string;
//     urlfb:string;
//     urltiktok:string;
//     describe:string;
//     phone:string;
//     createdAt:Date;
//     status:number;
//     // tổng số lượt đánh giá
//     ratingCount:number;
//     //tổng số sao đánh giá
//     ratingSum:number;
//     avatar:string;

//     soldCount:number;
// }