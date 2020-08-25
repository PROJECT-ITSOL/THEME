import { Product } from './product';
export class Supplier{
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    status: boolean;
    logo: string;
    products: Product[];
}