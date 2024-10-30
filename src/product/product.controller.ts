import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ServiceBusService } from './serviceBus'; 
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
   constructor(
       private service: ProductService,
       private serviceBusService: ServiceBusService 
   ) {}

   @Post()
   async createProduct(@Body() body: any) {
       const createdProduct = await this.service.createProduct(body);
       
       await this.serviceBusService.sendMessage('Produto criado com sucesso!');
       
       return createdProduct;
   }

   @Get('findMany')
   async findProducts() {
       const products = await this.service.findProducts();
       
       await this.serviceBusService.sendMessage('Produtos resgatados');
       
       return products;
   }

   @Get(':id')
   async findProduct(@Param('id') id: string) {
       const product = await this.service.findProduct(id);
       
       await this.serviceBusService.sendMessage(`Produto resgatado: ${id}`);
       
       return product;
   }

   @Put()
   async updateProduct(@Body() body: any) {
       const updatedProduct = await this.service.updateProduct(body);
       
       await this.serviceBusService.sendMessage('Produto atualizado');
       
       return updatedProduct;
   }

   @Delete()
   async deleteProduct(@Body() body: any) {
       const deletedProduct = await this.service.deleteProduct(body);
       
       await this.serviceBusService.sendMessage('Produto excluído');
       
       return deletedProduct;
   }
}
