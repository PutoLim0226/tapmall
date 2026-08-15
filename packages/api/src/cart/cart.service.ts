import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getBuyerId() {
    // Demo mode: select the seeded buyer
    const buyer = await this.prisma.user.findFirst({
      where: { role: 'BUYER' }
    });
    if (!buyer) throw new Error("No buyer found in DB.");
    return buyer.id;
  }

  async getCart() {
    const userId = await this.getBuyerId();
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'asc' }
    });
  }

  async addToCart(productId: string, quantity: number = 1) {
    const userId = await this.getBuyerId();
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

  async removeFromCart(itemId: string) {
    return this.prisma.cartItem.delete({
      where: { id: itemId }
    });
  }
}
