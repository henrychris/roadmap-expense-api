import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  providers: [SeederService],
  imports: [CategoriesModule],
})
export class SeedModule {}
