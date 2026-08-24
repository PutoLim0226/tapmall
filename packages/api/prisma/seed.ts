import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // Clear DB
  await prisma.cartItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  // Create a Seller User
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash('password123', salt);
  
  const seller = await prisma.user.create({
    data: {
      email: 'seller@tapmall.com',
      password: hashedPassword,
      name: 'Test Seller',
      role: 'SELLER'
    }
  });

  // Create a Store
  const store = await prisma.store.create({
    data: {
      name: 'Tapmall Official Store',
      description: 'The official store for high-quality items.',
      ownerId: seller.id
    }
  });

  // Create Categories
  const categoryNames = ['Electronics', 'Clothing', 'Home', 'Toys'];
  const categories = await Promise.all(
    categoryNames.map(name => prisma.category.create({ data: { name, description: `Category for ${name}` } }))
  );

  // Create Products with Network Images
  const productsToCreate = 12;
  for (let i = 0; i < productsToCreate; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.number.int({ min: 10, max: 100 }),
        imageUrl: `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
        storeId: store.id,
        categoryId: categories[i % categories.length].id
      }
    });
  }

  // Create a Buyer User
  await prisma.user.create({
    data: {
      email: 'buyer@tapmall.com',
      password: hashedPassword,
      name: 'Test Buyer',
      role: 'BUYER'
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
