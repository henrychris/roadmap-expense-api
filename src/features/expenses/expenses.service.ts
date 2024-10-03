import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Expense } from './entities/expense.entity';
import { User } from '../users/entities/user.entity';
import { JwtPayload } from '../auth/dto/jwtPayload';
import { mapExpenseToGetExpenseResponse } from './expense.mapper';
import { GetExpenseDto } from './dto/get-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createAsync(
    createExpenseDto: CreateExpenseDto,
    jwtUser: JwtPayload,
  ): Promise<GetExpenseDto> {
    const category = await this.categoryRepository.findOneBy({
      id: createExpenseDto.categoryId,
    });
    if (!category) {
      console.error(
        `Category not found with id: ${createExpenseDto.categoryId}.`,
      );
      throw new NotFoundException('Category not found');
    }

    const user = await this.userRepository.findOneBy({
      id: jwtUser.sub,
    });
    if (!user) {
      console.error(`User not found with id: ${jwtUser.sub}.`);
      throw new NotFoundException('User not found');
    }

    const expense = this.expenseRepository.create({
      ...createExpenseDto,
      category,
      user,
    });

    let res = await this.expenseRepository.save(expense);
    return mapExpenseToGetExpenseResponse(res);
  }

  findAll() {
    return `This action returns all expenses`;
  }

  findOne(id: string) {
    return `This action returns a #${id} expense`;
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: string) {
    return `This action removes a #${id} expense`;
  }
}
