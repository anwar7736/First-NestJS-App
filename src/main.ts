import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './post/middlewares/logger.middleware';
import { FunctionalMiddleware } from './post/middlewares/function.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(FunctionalMiddleware);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
