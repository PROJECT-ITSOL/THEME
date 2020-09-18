import { BillImport } from './billImport';
import { Product } from './product';

export class BillImportDetail{
    id:number;
    idBillImport:string;
    amount:number;
    price:number;
    idProduct:string;
    product:Product;
    nameProduct:string;
    totalPrice:number;
    billImport:BillImport;

    

}