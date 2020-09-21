import { Order } from './order';
import { Product } from './product';
//import { Product } from './product';
export class OderDetail{
    idOrderDetail: string;
    idOrder: string;
    idProduct: string;
    amount: number;
    product: Product;
    nameProduct: string='chuaco';
    price: number= 1000;
    totalPice: number=0;
    Order: Order;
}