import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1727868737702 implements MigrationInterface {
  name = 'SchemaUpdate1727868737702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "email" character varying NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "email"
        `);
  }
}
