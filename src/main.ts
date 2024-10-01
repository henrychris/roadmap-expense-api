import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as logger from 'morgan';

async function bootstrap() {
  const PORT = 3000;

  const app = await NestFactory.create(AppModule);
  app.use(logger('dev'));

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
