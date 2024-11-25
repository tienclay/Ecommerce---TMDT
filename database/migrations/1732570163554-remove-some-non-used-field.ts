import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveSomeNonUsedField1732570163554 implements MigrationInterface {
  name = 'RemoveSomeNonUsedField1732570163554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_date"`);
    await queryRunner.query(
      `ALTER TABLE "payments" DROP COLUMN "payment_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "payment_link_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "checkout_url" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "qr_code" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "cancellation_reason" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_427785468fb7d2733f59e7d7d39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "payment_method" SET DEFAULT 'Bank Transfer'`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."payments_status_enum" RENAME TO "payments_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_status_enum" AS ENUM('Success', 'Failed', 'Pending', 'Cancelled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "status" TYPE "public"."payments_status_enum" USING "status"::"text"::"public"."payments_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'Pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."payments_status_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_427785468fb7d2733f59e7d7d39" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_427785468fb7d2733f59e7d7d39"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_status_enum_old" AS ENUM('Success', 'Failed', 'Pending')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "status" TYPE "public"."payments_status_enum_old" USING "status"::"text"::"public"."payments_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'Pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."payments_status_enum_old" RENAME TO "payments_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "payment_method" SET DEFAULT 'Credit Card'`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_427785468fb7d2733f59e7d7d39" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP COLUMN "cancellation_reason"`,
    );
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "qr_code"`);
    await queryRunner.query(
      `ALTER TABLE "payments" DROP COLUMN "checkout_url"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP COLUMN "payment_link_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "payment_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "order_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
