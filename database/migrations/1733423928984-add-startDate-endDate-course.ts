import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStartDateEndDateCourse1733423928984
  implements MigrationInterface
{
  name = 'AddStartDateEndDateCourse1733423928984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" ADD "start_date" date`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "end_date" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "end_date"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "start_date"`);
  }
}
