import { Order } from './order';
import { Product } from './product';

export class ProductReturn{
    idProductReturn: number;
    idProduct: string;
    idOrder: string;
    orderFail: Order;
    product: Product;
    amount: number;
    status: string;
}