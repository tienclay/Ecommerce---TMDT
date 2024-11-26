import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderCode1732626601288 implements MigrationInterface {
  name = 'AddOrderCode1732626601288';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "order_code" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "UQ_e462c2f2237b3049aa6be3fce06" UNIQUE ("order_code")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "UQ_e462c2f2237b3049aa6be3fce06"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_code"`);
  }
}
