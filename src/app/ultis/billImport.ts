import { DatePipe } from '@angular/common';
import { BillImportDetail } from './billImportDetail';

export class BillImport{
    idBillImport:string;
    totalProduct:number;
    totalMoney:number;
    creatDate:Date;
    billImportDetail:BillImportDetail[];
}