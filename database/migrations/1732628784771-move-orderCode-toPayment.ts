import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveOrderCodeToPayment1732628784771 implements MigrationInterface {
  name = 'MoveOrderCodeToPayment1732628784771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "UQ_e462c2f2237b3049aa6be3fce06"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_code"`);
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "order_code" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "UQ_87606cc142b1a15c00445b647f5" UNIQUE ("order_code")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "UQ_87606cc142b1a15c00445b647f5"`,
    );
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "order_code"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "order_code" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "UQ_e462c2f2237b3049aa6be3fce06" UNIQUE ("order_code")`,
    );
  }
}