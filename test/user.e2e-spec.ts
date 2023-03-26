import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const prisma: PrismaClient = new PrismaClient();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users - List all User', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/users - Create user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'john.doe@gmail.com',
        password: 'a123456',
        name: 'John Doe',
      })
      .expect(201);
  });

  it('/users/:id - Update User', async () => {
    const user = await request(app.getHttpServer()).post('/users').send({
      email: 'john.doe@gmail.com',
      password: 'a123456',
      name: 'John Doe',
    });

    return request(app.getHttpServer())
      .patch(`/users/${user.body.user.id}`)
      .send({
        email: 'johnDoe@gmail.com',
      })
      .expect(200);
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });
});
