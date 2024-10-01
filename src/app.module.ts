import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
