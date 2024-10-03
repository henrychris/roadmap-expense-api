import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1727960452972 implements MigrationInterface {
  name = 'SchemaUpdate1727960452972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "Categories" (
                "dateCreated" TIMESTAMP NOT NULL DEFAULT now(),
                "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(),
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "Expenses"
            ADD "categoryId" uuid NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "Expenses"
            ADD CONSTRAINT "FK_222cc3539edd15881f12b0dac58" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Expenses" DROP CONSTRAINT "FK_222cc3539edd15881f12b0dac58"
        `);
    await queryRunner.query(`
            ALTER TABLE "Expenses" DROP COLUMN "categoryId"
        `);
    await queryRunner.query(`
            DROP TABLE "Categories"
        `);
  }
}
