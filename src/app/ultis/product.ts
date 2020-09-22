export class Product {
  idProduct: string;
  idCategory: string;
  idSupplier: number;
  name: string;
  price: number;
  image: string;
  content: string;
  favorite: number;
  amount: number;
  status: boolean;
  comments: Comment[];
  products: Product[];
}
