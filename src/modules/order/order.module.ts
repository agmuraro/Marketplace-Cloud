import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { PrismaModule } from 'src/core/infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}