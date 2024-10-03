export class GetExpenseDto {
  expense: {
    id: string;
    amount: number;
    currency: string;
  };
  category: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}
