import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './post/middlewares/logger.middleware';
import { FunctionalMiddleware } from './post/middlewares/function.middleware';
import { Transport } from '@nestjs/microservices';
import { PostCreatedDeserializer } from './post/deserializers/post-created.deserializer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(FunctionalMiddleware);

  //Config for RabbitMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.RABBITMQ_QUEUE,
      queueOptions: {
        durable: true,
      },
      deserializer: new PostCreatedDeserializer(),
    },
  });

    //Config for Kafka
  app.connectMicroservice({
  transport: Transport.KAFKA,

  options: {
    client: {
      clientId: process.env.KAFKA_CLIENT_ID,

      brokers: [
        process.env.KAFKA_BROKER!,
      ],
    },

    consumer: {
      groupId: process.env.KAFKA_GROUP_ID!,
    },
  },
});

  await app.startAllMicroservices();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
