export interface RequestTransfert{
    id:number;
    dateCreated;
    dateAccpted;
    numberPalette;
    deliveryManIds:any[];
    inventaryManagerId:number;
    exitVoucherId:number;
    entryVoucher:number;
    transfertLineIds:any[];
    state:number;
    siteDestinaion:string;
    siteSource:string;
}