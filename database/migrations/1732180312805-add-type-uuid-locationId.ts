import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTypeUuidLocationId1732180312805 implements MigrationInterface {
  name = 'AddTypeUuidLocationId1732180312805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "FK_cd86396f17312ef49862767d65d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "FK_2a00f6c97b008de708ff45a9271"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "FK_4bf7ef1ee4c5e2311772db95aff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "FK_db52b23b7ccf21158f54313dd9a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a00f6c97b008de708ff45a927"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cd86396f17312ef49862767d65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_558a3fb913ff4cd88a2380de9b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_cd86396f17312ef49862767d65d" PRIMARY KEY ("course_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP COLUMN "tutor_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_cd86396f17312ef49862767d65d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP COLUMN "course_id"`,
    );
    await queryRunner.query(`ALTER TABLE "course_tutors" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP COLUMN "courseId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP COLUMN "tutorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_d21ba012f3d0683df9d674e4ab7" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "course_tutors" ADD "courseId" uuid`);
    await queryRunner.query(`ALTER TABLE "course_tutors" ADD "tutorId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD "tutor_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_d21ba012f3d0683df9d674e4ab7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_c56eaefb21ddc28aa930bb1383e" PRIMARY KEY ("id", "tutor_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD "course_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_c56eaefb21ddc28aa930bb1383e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_3ec16eecf93e9993a3d0e0dae1d" PRIMARY KEY ("id", "tutor_id", "course_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_3ec16eecf93e9993a3d0e0dae1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_558a3fb913ff4cd88a2380de9b8" PRIMARY KEY ("tutor_id", "course_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a00f6c97b008de708ff45a927" ON "course_tutors" ("tutor_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cd86396f17312ef49862767d65" ON "course_tutors" ("course_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "FK_db52b23b7ccf21158f54313dd9a" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "FK_4bf7ef1ee4c5e2311772db95aff" FOREIGN KEY ("tutorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "FK_2a00f6c97b008de708ff45a9271" FOREIGN KEY ("tutor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "FK_cd86396f17312ef49862767d65d" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "FK_cd86396f17312ef49862767d65d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "FK_2a00f6c97b008de708ff45a9271"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "FK_4bf7ef1ee4c5e2311772db95aff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "FK_db52b23b7ccf21158f54313dd9a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cd86396f17312ef49862767d65"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a00f6c97b008de708ff45a927"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_558a3fb913ff4cd88a2380de9b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_3ec16eecf93e9993a3d0e0dae1d" PRIMARY KEY ("id", "tutor_id", "course_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_3ec16eecf93e9993a3d0e0dae1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_c56eaefb21ddc28aa930bb1383e" PRIMARY KEY ("id", "tutor_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP COLUMN "course_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_c56eaefb21ddc28aa930bb1383e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_d21ba012f3d0683df9d674e4ab7" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP COLUMN "tutor_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP COLUMN "tutorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP COLUMN "courseId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_d21ba012f3d0683df9d674e4ab7"`,
    );
    await queryRunner.query(`ALTER TABLE "course_tutors" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "course_tutors" ADD "tutorId" uuid`);
    await queryRunner.query(`ALTER TABLE "course_tutors" ADD "courseId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD "course_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_cd86396f17312ef49862767d65d" PRIMARY KEY ("course_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD "tutor_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_cd86396f17312ef49862767d65d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_558a3fb913ff4cd88a2380de9b8" PRIMARY KEY ("tutor_id", "course_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cd86396f17312ef49862767d65" ON "course_tutors" ("course_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a00f6c97b008de708ff45a927" ON "course_tutors" ("tutor_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "FK_db52b23b7ccf21158f54313dd9a" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "FK_4bf7ef1ee4c5e2311772db95aff" FOREIGN KEY ("tutorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "FK_2a00f6c97b008de708ff45a9271" FOREIGN KEY ("tutor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "FK_cd86396f17312ef49862767d65d" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
