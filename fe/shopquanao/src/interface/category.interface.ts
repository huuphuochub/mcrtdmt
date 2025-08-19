    export interface Category {
        id:number;
        name:string;
        urlimage:string;

    }

    export interface Subcategory{
        id:number;
        name:string;
        categoryId:number
    }