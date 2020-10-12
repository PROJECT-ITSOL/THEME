import { Product } from './product';
export class Supplier{
    idSupplier: number;
    idCode:string;
    name: string;
    phoneNumber: string;
    address: string;
    status: boolean;
    logo: string;
    products: Product[];
}