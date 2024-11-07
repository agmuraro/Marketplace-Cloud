import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() body: { userId: number, products: { productId: string, quantity: number }[] }
  ) {
    return this.orderService.createOrder(body.userId, body.products);
  }
}
