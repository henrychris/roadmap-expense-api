import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../features/users/users.module';
import { ExpensesModule } from '../features/expenses/expenses.module';
import { AuthModule } from '../features/auth/auth.module';
import { CategoriesModule } from '../features/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConfig from '../config/databaseConfig';
import { SeedModule } from 'src/features/seed/seed.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UsersModule,
    ExpensesModule,
    CategoriesModule,
    SeedModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
      validationOptions: {
        noDefaults: true,
        abortEarly: false,
      },
    }),
    // todo: can i store db config in a single location, and use it in both dataSource.ts and here
    // instead of duplicating configuration
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<DatabaseConfig>) => ({
        type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        autoLoadEntities: true,
        migrations: [__dirname + 'data/migrations/**/*{.ts,.js}'],
        cli: {
          migrationsDir: __dirname + 'data/migrations/',
        },
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      ttl: 10000, // 10s
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
