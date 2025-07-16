    export interface Category {
        id:number;
        name:string;
        imageurl:string;

    }

    export interface Subcategory{
        id:number;
        name:string;
        categoryId:number
    }