import { Product } from './product';
export class Supplier{
    idSupplier: number;
    name: string;
    phoneNumber: string;
    address: string;
    status: boolean;
    logo: string;
    products: Product[];
}