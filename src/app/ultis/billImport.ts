
import { BillImportDetail } from './billImportDetail';

export class BillImport{
    idBillImport:string;
    totalProduct:number;
    totalMoney:number;
    createDate:string;
    billImportDetail:BillImportDetail[];
}