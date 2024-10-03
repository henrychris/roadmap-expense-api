import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Expenses' })
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column({ length: 3 })
  currency: string;

  @ManyToOne(() => User, (user) => user.expenses, { nullable: false })
  user: User;

  @ManyToOne(() => Category, (category) => category, {
    nullable: false,
  })
  category: Category;
}
