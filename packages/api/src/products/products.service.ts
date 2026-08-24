import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        store: {
          select: { name: true }
        }
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        store: {
          select: { name: true }
        }
      }
    });
  }

  async create(userId: string, data: any) {
    let store = await this.prisma.store.findFirst({
      where: { ownerId: userId }
    });

    if (!store) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      store = await this.prisma.store.create({
        data: {
          name: `${user?.name || 'User'}'s Store`,
          ownerId: userId,
        }
      });
    }

    const { name, description, price, stock, imageUrl, categoryId } = data;
    return this.prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        imageUrl,
        storeId: store.id,
        categoryId: categoryId || undefined,
      }
    });
  }
}
