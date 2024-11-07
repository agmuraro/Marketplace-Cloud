import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';
import { PrismaService } from 'src/core/infrastructure/prisma/prisma.service';
import { ServiceBusService } from './services/serviceBus';

@Module({
  imports: [ServiceBusService],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, PrismaService, ServiceBusService]
})
export class ProductModule {}

