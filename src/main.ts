import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as logger from 'morgan';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { SeederService } from './features/seed/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  const seederService = app.get(SeederService);
  await seederService.seedCategories();

  const configService = app.get(ConfigService);
  const PORT: number = configService.getOrThrow('PORT');

  app
    .listen(PORT)
    .then(() => {
      console.log(`App listening on http://localhost:${PORT}`);
    })
    .catch((error) => {
      console.error(error);
      app.close();
    });
}
bootstrap();
