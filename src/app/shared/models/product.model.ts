export interface Product{
    id:number;
    name:string;
    description:string;
    sellingPrice:number;
    buyingPrice:number;
    state:boolean;
    active:boolean;
    imagesIds:any[];
    categoryId:any;
    siteStockId:any;
    quantity:number;

}