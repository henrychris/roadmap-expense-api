import { Type } from 'class-transformer';
import { IsOptional, IsEnum, IsISO8601, IsNumber, Min, IsInt } from 'class-validator';

export class ExpenseFilterDto {
  @IsOptional()
  @IsEnum(['week', 'month', '3months'], { message: 'Invalid filter option' })
  filter?: 'week' | 'month' | '3months';

  @IsOptional()
  @IsISO8601({}, { message: 'startDate must be in this format: YYYY-MM-DD' })
  startDate?: string;

  @IsOptional()
  @IsISO8601({}, { message: 'endDate must be in this format: YYYY-MM-DD' })
  endDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'Limit must be at least 1' })
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0, { message: 'Page must be at least 0' })
  page?: number;
}
