import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDegreeExpToProfile1733408276170 implements MigrationInterface {
  name = 'AddDegreeExpToProfile1733408276170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."profiles_degree_enum" AS ENUM('Bachelor', 'Master', 'PhD')`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "degree" "public"."profiles_degree_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "experience_years" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "order_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "order_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP COLUMN "experience_years"`,
    );
    await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "degree"`);
    await queryRunner.query(`DROP TYPE "public"."profiles_degree_enum"`);
  }
}
