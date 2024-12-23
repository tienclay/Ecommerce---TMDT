import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1732094815094 implements MigrationInterface {
  name = 'InitDatabase1732094815094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."profiles_phone_code_enum" AS ENUM('+84', '+1', '+93', '+358-18', '+355', '+213', '+1-684', '+376', '+244', '+1-264', '+672', '+1-268', '+54', '+374', '+297', '+61', '+43', '+994', '+973', '+880', '+1-246', '+375', '+32', '+501', '+229', '+1-441', '+975', '+591', '+599', '+387', '+267', '+0055', '+55', '+246', '+673', '+359', '+226', '+257', '+855', '+237', '+238', '+1-345', '+236', '+235', '+56', '+86', '+57', '+269', '+242', '+682', '+506', '+225', '+385', '+53', '+357', '+420', '+243', '+45', '+253', '+1-767', '+1-809', '+593', '+20', '+503', '+240', '+291', '+372', '+268', '+251', '+500', '+298', '+679', '+358', '+33', '+594', '+689', '+262', '+241', '+220', '+995', '+49', '+233', '+350', '+30', '+299', '+1-473', '+590', '+1-671', '+502', '+44-1481', '+224', '+245', '+592', '+509', '+504', '+852', '+36', '+354', '+91', '+62', '+98', '+964', '+353', '+972', '+39', '+1-876', '+81', '+44-1534', '+962', '+7', '+254', '+686', '+383', '+965', '+996', '+856', '+371', '+961', '+266', '+231', '+218', '+423', '+370', '+352', '+853', '+261', '+265', '+60', '+960', '+223', '+356', '+44-1624', '+692', '+596', '+222', '+230', '+52', '+691', '+373', '+377', '+976', '+382', '+1-664', '+212', '+258', '+95', '+264', '+674', '+977', '+31', '+687', '+64', '+505', '+227', '+234', '+683', '+850', '+389', '+=1-670', '+47', '+968', '+92', '+680', '+970', '+507', '+675', '+595', '+51', '+63', '+870', '+48', '+351', '+1-787', '+974', '+40', '+250', '+290', '+1-869', '+1-758', '+508', '+1-784', '+685', '+378', '+239', '+966', '+221', '+381', '+248', '+232', '+65', '+1721', '+421', '+386', '+677', '+252', '+27', '+82', '+211', '+34', '+94', '+249', '+597', '+46', '+41', '+963', '+886', '+992', '+255', '+66', '+1-242', '+670', '+228', '+690', '+676', '+1-868', '+216', '+90', '+993', '+1-649', '+688', '+256', '+380', '+971', '+44', '+598', '+998', '+678', '+379', '+58', '+1-284', '+1-340', '+681', '+967', '+260', '+263')`,
    );
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "avatar" character varying, "first_name" character varying(255), "last_name" character varying(255), "bio" text, "address" character varying, "birth_of_date" date, "phone_code" "public"."profiles_phone_code_enum", "phone_number" character varying(20), "user_id" uuid, CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "status_id" uuid NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "statuses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "content" text NOT NULL, "parent_status_id" uuid, "likes_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "student_id" uuid NOT NULL, "tutor_id" uuid NOT NULL, "rating" integer NOT NULL, "comment" text, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."course_fees_fee_type_enum" AS ENUM('One-time', 'Recurring')`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_fees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "course_id" uuid NOT NULL, "fee_amount" numeric(10,2) NOT NULL, "fee_type" "public"."course_fees_fee_type_enum" NOT NULL DEFAULT 'One-time', "description" text, CONSTRAINT "PK_0a9521d14ff5a2f911336c079f8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "available_from" TIMESTAMP NOT NULL, "available_to" TIMESTAMP NOT NULL, "location_id" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "address_line1" character varying NOT NULL, "address_line2" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip_code" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "subject" character varying NOT NULL, "duration" character varying NOT NULL, "location_id" uuid NOT NULL, "description" text, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('Pending', 'Completed', 'Cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "student_id" uuid NOT NULL, "course_id" uuid NOT NULL, "course_fee_id" uuid NOT NULL, "order_date" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."orders_status_enum" NOT NULL DEFAULT 'Pending', "total_amount" numeric(10,2) NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."memberships_membership_type_enum" AS ENUM('Basic', 'Premium', 'VIP')`,
    );
    await queryRunner.query(
      `CREATE TABLE "memberships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "membership_type" "public"."memberships_membership_type_enum" NOT NULL DEFAULT 'Basic', "start_date" date NOT NULL, "end_date" date NOT NULL, "payment_id" uuid, CONSTRAINT "REL_fc362733a3ee2eeb61cf1916fa" UNIQUE ("payment_id"), CONSTRAINT "PK_25d28bd932097a9e90495ede7b4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_payment_method_enum" AS ENUM('Credit Card', 'PayPal', 'Bank Transfer')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_status_enum" AS ENUM('Success', 'Failed', 'Pending')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "order_id" uuid NOT NULL, "membership_id" uuid, "amount" numeric(10,2) NOT NULL, "payment_date" TIMESTAMP NOT NULL DEFAULT now(), "payment_method" "public"."payments_payment_method_enum" NOT NULL DEFAULT 'Credit Card', "status" "public"."payments_status_enum" NOT NULL DEFAULT 'Pending', "user_id" uuid, CONSTRAINT "REL_b2f7b823a21562eeca20e72b00" UNIQUE ("order_id"), CONSTRAINT "REL_a3a19c5ae34d259228bbf77497" UNIQUE ("membership_id"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'STUDENT', 'TUTOR')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "username" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'STUDENT', "status" "public"."users_status_enum" NOT NULL, "refresh_token" text, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_tutors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "courseId" uuid, "tutorId" uuid, CONSTRAINT "PK_d21ba012f3d0683df9d674e4ab7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tutors" DROP CONSTRAINT "PK_d21ba012f3d0683df9d674e4ab7"`,
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
      `ALTER TABLE "profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_5bf40b144805c059ad9e7dd500e" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "statuses" ADD CONSTRAINT "FK_95fcdbc022b0ee9c4fb645504b0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "statuses" ADD CONSTRAINT "FK_c0b9354b1663c3ee261f62f7bf3" FOREIGN KEY ("parent_status_id") REFERENCES "statuses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_e0acaa8a47b2de7ecd1133e2bde" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_37ebe3de5b8aead2133b67d9626" FOREIGN KEY ("tutor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_fees" ADD CONSTRAINT "FK_59cc0be417583fe4ade43a25892" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_55e6651198104efea0b04568a88" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_f4308872196c53677fa6d3773ca" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_0943221d24dc56b752e9575fd5c" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_6c846a094b1989e1a202558803b" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_8f64e2f0728bad0f6c6aa6413b2" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_389c7e4bb1fe55e609cf729b7e7" FOREIGN KEY ("course_fee_id") REFERENCES "course_fees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" ADD CONSTRAINT "FK_7c1e2fdfed4f6838e0c05ae5051" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" ADD CONSTRAINT "FK_fc362733a3ee2eeb61cf1916fa5" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_a3a19c5ae34d259228bbf774977" FOREIGN KEY ("membership_id") REFERENCES "memberships"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_427785468fb7d2733f59e7d7d39" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_427785468fb7d2733f59e7d7d39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_a3a19c5ae34d259228bbf774977"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" DROP CONSTRAINT "FK_fc362733a3ee2eeb61cf1916fa5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" DROP CONSTRAINT "FK_7c1e2fdfed4f6838e0c05ae5051"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_389c7e4bb1fe55e609cf729b7e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_8f64e2f0728bad0f6c6aa6413b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_6c846a094b1989e1a202558803b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_0943221d24dc56b752e9575fd5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_f4308872196c53677fa6d3773ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_55e6651198104efea0b04568a88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_fees" DROP CONSTRAINT "FK_59cc0be417583fe4ade43a25892"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_37ebe3de5b8aead2133b67d9626"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_e0acaa8a47b2de7ecd1133e2bde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "statuses" DROP CONSTRAINT "FK_c0b9354b1663c3ee261f62f7bf3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "statuses" DROP CONSTRAINT "FK_95fcdbc022b0ee9c4fb645504b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_5bf40b144805c059ad9e7dd500e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`,
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
      `ALTER TABLE "course_tutors" ADD CONSTRAINT "PK_d21ba012f3d0683df9d674e4ab7" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`DROP TABLE "course_tutors"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."payments_payment_method_enum"`,
    );
    await queryRunner.query(`DROP TABLE "memberships"`);
    await queryRunner.query(
      `DROP TYPE "public"."memberships_membership_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(`DROP TABLE "locations"`);
    await queryRunner.query(`DROP TABLE "schedules"`);
    await queryRunner.query(`DROP TABLE "course_fees"`);
    await queryRunner.query(`DROP TYPE "public"."course_fees_fee_type_enum"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "statuses"`);
    await queryRunner.query(`DROP TABLE "likes"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TYPE "public"."profiles_phone_code_enum"`);
  }
}
