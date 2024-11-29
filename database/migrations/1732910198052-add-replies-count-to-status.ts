import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRepliesCountToStatus1732910198052
  implements MigrationInterface
{
  name = 'AddRepliesCountToStatus1732910198052';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statuses" ADD "replies_count" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statuses" DROP COLUMN "replies_count"`,
    );
  }
}
