import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
    constructor(private service: ProductService){}

    @Post()
    async createProduct(@Body() body: any){
        return await this.service.createProduct(body)
    }

    @Get('findMany')
    async findProducts(){
        return await this.service.findProducts()
    }

    @Get(':id')
    async findProduct(@Param('id') id: string){
        return await this.service.findProduct(id)
    }

    @Put()
    async updateProduct(@Body()body: any){
        return await this.service.updateProduct(body)
    }
}
