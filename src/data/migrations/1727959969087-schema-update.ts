import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1727959969087 implements MigrationInterface {
    name = 'SchemaUpdate1727959969087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Expenses" DROP CONSTRAINT "FK_3ccd68f2e3057e48f220b789588"
        `);
        await queryRunner.query(`
            ALTER TABLE "Expenses"
            ALTER COLUMN "userId"
            SET NOT NULL
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
            ALTER TABLE "Expenses"
            ALTER COLUMN "userId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "Expenses"
            ADD CONSTRAINT "FK_3ccd68f2e3057e48f220b789588" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
