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
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from '../auth/guards/authGuard';
import { CurrentUser } from '../../common/decorators/currentUser';
import { JwtPayload } from '../auth/dto/jwtPayload';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async createAsync(
    @Body() createExpenseDto: CreateExpenseDto,
    @CurrentUser() jwtUser: JwtPayload,
  ) {
    return await this.expensesService.createAsync(createExpenseDto, jwtUser);
  }

  @Get()
  findAll(@CurrentUser() jwtUser: JwtPayload) {
    return this.expensesService.findAll(jwtUser);
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
