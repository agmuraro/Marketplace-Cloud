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
       await this.serviceBusService.sendMessage('create', { id: createdProduct.id });
       return createdProduct;
   }

   @Get('findMany')
   async findProducts() {
       const products = await this.service.findProducts();
       await this.serviceBusService.sendMessage('findMany', {});
       return products;
   }

   @Get(':id')
   async findProduct(@Param('id') id: string) {
       const product = await this.service.findProduct(id);
       await this.serviceBusService.sendMessage('findOne', { id });
       return product;
   }

   @Put()
   async updateProduct(@Body() body: any) {
       const updatedProduct = await this.service.updateProduct(body);
       await this.serviceBusService.sendMessage('update', { id: updatedProduct.id });
       return updatedProduct;
   }

   @Delete( )
   async deleteProduct(@Body() body: {id:string}) {
       await this.service.deleteProduct(body);
       await this.serviceBusService.sendMessage('delete', { body });
       return { message: 'Produto excluído com sucesso' };
   }
}
