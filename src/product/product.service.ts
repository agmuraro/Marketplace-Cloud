import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(private repository: ProductRepository){}

    async createProduct(body: any){
        return await this.repository.createProduct(body)
    }

    async findProducts(){
        return await this.repository.findProducts()
    }

    async findProduct(id: string){
        return await this.repository.findProduct(id)
    }

    async updateProduct(body: any){
        return await this.repository.updateProduct(body)
    }

    async deleteProduct(body: any){
        return await this.repository.deleteProduct(body)
    }
}
