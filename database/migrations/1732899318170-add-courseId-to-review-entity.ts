import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCourseIdToReviewEntity1732899318170
  implements MigrationInterface
{
  name = 'AddCourseIdToReviewEntity1732899318170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reviews" ADD "course_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_37ebe3de5b8aead2133b67d9626"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ALTER COLUMN "tutor_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_37ebe3de5b8aead2133b67d9626" FOREIGN KEY ("tutor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_f99062f36181ab42863facfaea3" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_f99062f36181ab42863facfaea3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_37ebe3de5b8aead2133b67d9626"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ALTER COLUMN "tutor_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_37ebe3de5b8aead2133b67d9626" FOREIGN KEY ("tutor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "course_id"`);
  }
}
