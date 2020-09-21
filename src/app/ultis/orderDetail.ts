import { Order } from './order';
import { Product } from './product';
//import { Product } from './product';
export class OderDetail{
    idOrderDetail: string;
    idOrder: string;
    idProduct: string;
    amount: number;
    nameProduct: string;
    price: number;
}