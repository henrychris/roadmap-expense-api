import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1727960216742 implements MigrationInterface {
  name = 'SchemaUpdate1727960216742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Expenses" DROP COLUMN "passwordHash"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Expenses"
            ADD "passwordHash" character varying NOT NULL
        `);
  }
}
