import { Order } from './order';
import { Product } from './product';
//import { Product } from './product';
export class OderDetail{
    idOrderDetail: number;
    idOrder: string;
    idProduct: string;
    amount: number;
    amountProduct: number;
    nameProduct: string;
    price: number;
    product: Product;
    totalPrice:number;
}