import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
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
