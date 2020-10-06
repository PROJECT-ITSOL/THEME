import { Customer } from './customer';
// dung de khai bao 1 doi tuong 
import { OderDetail } from "./orderDetail";
export class Order {
    idOrder: string;
    idCustomer: number;
   createDate: Date;
  // createDate:string;
    status: string;
    
    customer: Customer;
    nameCustomer:string;
    phoneCustomer: string;
    emailSuctomer: string;
    totalMoney: number;
    orderDetail: OderDetail[];

}