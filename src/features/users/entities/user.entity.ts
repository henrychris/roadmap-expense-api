import { BaseEntity } from 'src/common/entities/base.entity';
import { Expense } from 'src/features/expenses/entities/expense.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'Users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];
}
