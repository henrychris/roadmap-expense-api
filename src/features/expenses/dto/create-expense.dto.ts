import {
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  @IsISO4217CurrencyCode()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  categoryId: string;
}
