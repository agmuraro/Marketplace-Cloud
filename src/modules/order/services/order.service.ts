import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/infrastructure/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: number, products: { productId: string, quantity: number }[]) {
    let totalAmount = 0;

    // Cria o pedido com os itens
    const order = await this.prisma.order.create({
      data: {
        createdAt: new Date(),
        userId: userId,
        price: 0,  // Definimos como 0 inicialmente e depois atualizamos
        orderItem: {
          create: products.map((p) => ({
            product: { connect: { id: p.productId } },
            quantidade: p.quantity,
          })),
        },
      },
      include: {
        orderItem: {
          include: { product: true },
        },
      },
    });

    // Calcula o total e atualiza o estoque
    for (const item of order.orderItem) {
      totalAmount += parseFloat(item.product.price) * item.quantidade;

      // Atualiza o estoque do produto
      await this.prisma.product.update({
        where: { id: item.productId },
        data: { stock: item.product.stock - item.quantidade },
      });
    }

    // Atualiza o preço final do pedido
    await this.prisma.order.update({
      where: { id: order.id },
      data: { price: totalAmount },
    });

    return order;
  }
}
