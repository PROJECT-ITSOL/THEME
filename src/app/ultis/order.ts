// dung de khai bao 1 doi tuong 
import { OderDetail } from "./orderDetail";
export class Order {
    idOrder: string;
    idCustomer: string;
    createDate: Date;
    status: string;
    totalMoney: number;
    orderDetail: OderDetail[];

}