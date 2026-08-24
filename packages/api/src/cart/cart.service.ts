import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'asc' }
    });
  }

  async addToCart(userId: string, productId: string, quantity: number = 1) {
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { userId, productId }
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    }

    return this.prisma.cartItem.create({
      data: { userId, productId, quantity }
    });
  }

  async removeFromCart(userId: string, itemId: string) {
    return this.prisma.cartItem.delete({
      where: { id: itemId, userId }
    });
  }
}
