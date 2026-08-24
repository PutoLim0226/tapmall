import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Endpoints (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
    
    // clean up users before running
    await prisma.user.deleteMany({ where: { email: 'e2e@test.com' } });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'e2e@test.com' } });
    await app.close();
  });

  it('/api/auth/register (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'e2e@test.com', password: 'password', name: 'e2e test' })
      .expect(201);
      
    expect(res.body.access_token).toBeDefined();
    jwtToken = res.body.access_token;
  });

  it('/api/auth/login (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'e2e@test.com', password: 'password' })
      .expect(200);
      
    expect(res.body.access_token).toBeDefined();
    jwtToken = res.body.access_token; // ensure we use the latest token
  });

  it('/api/categories (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/categories')
      .expect(200);
      
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/api/cart (GET) requires auth', async () => {
    await request(app.getHttpServer())
      .get('/cart')
      .expect(401);
  });

  it('/api/cart (GET) works with auth', async () => {
    const res = await request(app.getHttpServer())
      .get('/cart')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
      
    expect(Array.isArray(res.body)).toBe(true);
  });
});
