import { Supplier } from './supplier';

import { BillImportDetail } from './billImportDetail';

export class BillImport{
    idBillImport:number;
    idCode:string;
    totalProduct:number;
    totalMoney:number;
    createDate:string;
    supplier:Supplier;
    nameSupplier:string;
    billImportDetail:BillImportDetail[];
    idSupplier:number;
}