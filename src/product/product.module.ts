import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { PrismaService } from 'src/prisma.service';
import { ServiceBusService } from './serviceBus';

@Module({
  imports: [ServiceBusService],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, PrismaService, ServiceBusService]
})
export class ProductModule {}

