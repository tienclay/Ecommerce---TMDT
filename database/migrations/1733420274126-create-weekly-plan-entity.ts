import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWeeklyPlanEntity1733420274126 implements MigrationInterface {
  name = 'CreateWeeklyPlanEntity1733420274126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "weekly_plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "week_number" integer NOT NULL, "topic" character varying NOT NULL, "description" text, "course_id" uuid NOT NULL, CONSTRAINT "PK_6c64b331bf3b98025f865282292" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "weekly_plans" ADD CONSTRAINT "FK_c56dfeb2980dcac88c0636dc19e" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "weekly_plans" DROP CONSTRAINT "FK_c56dfeb2980dcac88c0636dc19e"`,
    );
    await queryRunner.query(`DROP TABLE "weekly_plans"`);
  }
}
