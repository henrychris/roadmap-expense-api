import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { ExpensesModule } from '../expenses/expenses.module';
import * as Joi from 'joi';

@Module({
  imports: [
    UsersModule,
    ExpensesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().required(),
        DB_URL: Joi.string().uri().required(),
        DATABASE_PASSWORD: Joi.string().required(),
      }),
      validationOptions: {
        noDefaults: true,
        abortEarly: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
