import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as logger from 'morgan';
import { ConfigService } from '@nestjs/config';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { SeederService } from './features/seed/seeder.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorResponseFilter } from './app/filters/errorResponseFilter';
import { SuccessResponseInterceptor } from './app/interceptors/successResponseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new UnprocessableEntityException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints!).join(', '),
          })),
        );
      },
    }),
  );

  app.useGlobalFilters(new ErrorResponseFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  const seederService = app.get(SeederService);
  await seederService.seedCategories();

  const configService = app.get(ConfigService);
  const PORT: number = configService.getOrThrow('PORT');

  const config = new DocumentBuilder()
    .setTitle('Expense API')
    .setDescription('A simple API to learn NestJs.')
    .setVersion('1.0')
    .addTag('expenses')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

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
