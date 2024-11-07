export class Product {
    id: string; 
    name: string;
    description: string;
    price: number;
    stock: number;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(partial: Partial<Product>) {
      Object.assign(this, partial);
    }
  }
  