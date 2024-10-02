import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1727868377459 implements MigrationInterface {
  name = 'SchemaUpdate1727868377459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "Expenses" (
                "dateCreated" TIMESTAMP NOT NULL DEFAULT now(),
                "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(),
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "amount" integer NOT NULL,
                "currency" character varying(3) NOT NULL,
                "passwordHash" character varying NOT NULL,
                "userId" uuid,
                CONSTRAINT "PK_73a0d7637c29244275d95476dfd" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Users" (
                "dateCreated" TIMESTAMP NOT NULL DEFAULT now(),
                "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(),
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "passwordHash" character varying NOT NULL,
                CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "Expenses"
            ADD CONSTRAINT "FK_3ccd68f2e3057e48f220b789588" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Expenses" DROP CONSTRAINT "FK_3ccd68f2e3057e48f220b789588"
        `);
    await queryRunner.query(`
            DROP TABLE "Users"
        `);
    await queryRunner.query(`
            DROP TABLE "Expenses"
        `);
  }
}
