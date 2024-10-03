import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Expenses' })
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  amount: number;

  @Column({ length: 3 })
  currency: string;

  @Column()
  passwordHash: string;

  @ManyToOne(() => User, (user) => user.expenses, { nullable: false })
  user: User;
}
