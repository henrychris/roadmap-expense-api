import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async seedCategories() {
    const categories = [
      { id: '01925281-6c58-7291-8cbd-2cd274a6ee3e', name: 'Food' },
      { id: '01925281-6c58-767e-b158-84c660ff9fb7', name: 'Transport' },
      { id: '01925281-6c58-724a-9c45-ea5dfeb80ed7', name: 'Entertainment' },
      { id: '01925281-6c58-7c12-98cf-d16cd5538495', name: 'Rent' },
      { id: '01925281-6c58-7137-9b2e-2e975cf0bddf', name: 'Utilities' },
    ];

    for (const category of categories) {
      const exists = await this.categoryRepository.findOne({
        where: { name: category.name },
      });
      if (!exists) {
        await this.categoryRepository.save(
          this.categoryRepository.create(category),
        );
      }
    }

    console.log('Categories seeded successfully');
  }
}
