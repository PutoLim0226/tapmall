import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, ProductsModule, StoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
