import { GetExpenseDto } from './dto/get-expense.dto';
import { Expense } from './entities/expense.entity';

export function mapExpenseToGetExpenseResponse(
  expense: Expense,
): GetExpenseDto {
  return {
    expense: {
      id: expense.id,
      amount: expense.amount,
      currency: expense.currency,
    },
    category: {
      id: expense.category.id,
      name: expense.category.name,
    },
    user: {
      id: expense.user.id,
      firstName: expense.user.firstName,
      lastName: expense.user.lastName,
    },
  };
}
