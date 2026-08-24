import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.sub);
  }

  @Post()
  addToCart(@Request() req: any, @Body() dto: { productId: string, quantity?: number }) {
    return this.cartService.addToCart(req.user.sub, dto.productId, dto.quantity);
  }

  @Delete(':id')
  removeFromCart(@Request() req: any, @Param('id') id: string) {
    return this.cartService.removeFromCart(req.user.sub, id);
  }
}
