export class Customer{
    id: number;
    name: string;
    password: string;
    phoneNumber: string;
    address: string;
    email: string;
    status: boolean;
    amountBoom: number;
    comments: Comment[];
    customers: Customer[];
}
