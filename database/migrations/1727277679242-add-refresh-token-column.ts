import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenColumn1727277679242 implements MigrationInterface {
  name = 'AddRefreshTokenColumn1727277679242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
  }
}
