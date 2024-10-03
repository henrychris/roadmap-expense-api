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

    const res = await this.expenseRepository.save(expense);
    return mapExpenseToGetExpenseResponse(res);
  }

  async findAll(jwtUser: JwtPayload) {
    const res = await this.expenseRepository.find({
      relations: {
        category: true,
        user: true,
      },
      where: {
        user: {
          id: jwtUser.sub,
        },
      },
    });

    return res.map((x) => mapExpenseToGetExpenseResponse(x));
  }

  async findOneAsync(expenseId: string, jwtUser: JwtPayload) {
    const expense = await this.expenseRepository.findOne({
      where: {
        id: expenseId,
        user: {
          id: jwtUser.sub,
        },
      },
      relations: {
        category: true,
        user: true,
      },
    });

    if (!expense) {
      console.error(
        `Expense not found with id: ${expenseId}, user id: ${jwtUser.sub}`,
      );
      throw new NotFoundException('Expense not found');
    }

    return mapExpenseToGetExpenseResponse(expense);
  }

  async updateAsync(
    expenseId: string,
    updateExpenseDto: UpdateExpenseDto,
    jwtUser: JwtPayload,
  ): Promise<void> {
    const expense = await this.expenseRepository.findOne({
      where: { id: expenseId, user: { id: jwtUser.sub } },
      relations: {
        category: true,
      },
    });

    if (!expense) {
      console.error(
        `Expense not found with id: ${expenseId}, user id: ${jwtUser.sub}`,
      );
      throw new NotFoundException('Expense not found');
    }

    if (
      updateExpenseDto.categoryId &&
      expense.category.id !== updateExpenseDto.categoryId
    ) {
      const category = await this.categoryRepository.findOneBy({
        id: updateExpenseDto.categoryId,
      });

      if (!category) {
        console.error(
          `Category not found with id: ${updateExpenseDto.categoryId}.`,
        );
        throw new NotFoundException('Category not found');
      }

      expense.category = category;
    }

    Object.assign(expense, updateExpenseDto);

    // Save the updated expense
    await this.expenseRepository.save(expense);
  }

  async removeAsync(expenseId: string, jwtUser: JwtPayload): Promise<void> {
    const deleteResult = await this.expenseRepository.delete({
      id: expenseId,
      user: {
        id: jwtUser.sub,
      },
    });

    if (deleteResult.affected && deleteResult.affected === 0) {
      console.error(
        `Expense not found with id: ${expenseId}, user id: ${jwtUser.sub}`,
      );
      throw new NotFoundException('Expense not found');
    }
  }
}
