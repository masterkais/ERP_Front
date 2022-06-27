export interface sale{
    forEach(arg0: (data: any) => void);
    id: number,
    dateCreated:any,
    dateAccpted:any ,
    numberPalette: number,
    deliveryManIds: [],
    purchasingManagerId: any,
    invoiceId: number,
    receivedId: number,
    ligneSaleIds: number[],
    state: number,
    clientId: any,
    siteStockSaleName:number,
    totalSale: number,
}
