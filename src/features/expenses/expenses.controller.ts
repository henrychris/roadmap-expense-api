import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from '../auth/guards/authGuard';
import { CurrentUser } from '../../common/decorators/currentUser';
import { JwtPayload } from '../auth/dto/jwtPayload';
import { ExpenseFilterDto } from './dto/expense.filter.dto';
import { CACHE_MANAGER, Cache, CacheInterceptor } from '@nestjs/cache-manager';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async createAsync(
    @Body() createExpenseDto: CreateExpenseDto,
    @CurrentUser() jwtUser: JwtPayload,
  ) {
    return await this.expensesService.createAsync(createExpenseDto, jwtUser);
  }

  @UseInterceptors(CacheInterceptor)
  @UseGuards(ThrottlerGuard)
  @Get()
  async findAll(
    @CurrentUser() jwtUser: JwtPayload,
    @Query() filterDto: ExpenseFilterDto,
  ) {
    return await this.expensesService.findAllAsync(jwtUser, filterDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() jwtUser: JwtPayload) {
    return await this.expensesService.findOneAsync(id, jwtUser);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @CurrentUser() jwtUser: JwtPayload,
  ) {
    return this.expensesService.updateAsync(id, updateExpenseDto, jwtUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() jwtUser: JwtPayload) {
    return await this.expensesService.removeAsync(id, jwtUser);
  }
}
