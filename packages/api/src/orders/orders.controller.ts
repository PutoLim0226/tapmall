import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkout(@Request() req: any) {
    const userId = req.user.sub;
    return this.ordersService.checkout(userId);
  }
}
