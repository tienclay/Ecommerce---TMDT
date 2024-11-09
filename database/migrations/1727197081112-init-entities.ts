import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEntities1727197081112 implements MigrationInterface {
  name = 'InitEntities1727197081112';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_phone_code_enum" AS ENUM('+84', '+1', '+93', '+358-18', '+355', '+213', '+1-684', '+376', '+244', '+1-264', '+672', '+1-268', '+54', '+374', '+297', '+61', '+43', '+994', '+973', '+880', '+1-246', '+375', '+32', '+501', '+229', '+1-441', '+975', '+591', '+599', '+387', '+267', '+0055', '+55', '+246', '+673', '+359', '+226', '+257', '+855', '+237', '+238', '+1-345', '+236', '+235', '+56', '+86', '+57', '+269', '+242', '+682', '+506', '+225', '+385', '+53', '+357', '+420', '+243', '+45', '+253', '+1-767', '+1-809', '+593', '+20', '+503', '+240', '+291', '+372', '+268', '+251', '+500', '+298', '+679', '+358', '+33', '+594', '+689', '+262', '+241', '+220', '+995', '+49', '+233', '+350', '+30', '+299', '+1-473', '+590', '+1-671', '+502', '+44-1481', '+224', '+245', '+592', '+509', '+504', '+852', '+36', '+354', '+91', '+62', '+98', '+964', '+353', '+972', '+39', '+1-876', '+81', '+44-1534', '+962', '+7', '+254', '+686', '+383', '+965', '+996', '+856', '+371', '+961', '+266', '+231', '+218', '+423', '+370', '+352', '+853', '+261', '+265', '+60', '+960', '+223', '+356', '+44-1624', '+692', '+596', '+222', '+230', '+52', '+691', '+373', '+377', '+976', '+382', '+1-664', '+212', '+258', '+95', '+264', '+674', '+977', '+31', '+687', '+64', '+505', '+227', '+234', '+683', '+850', '+389', '+=1-670', '+47', '+968', '+92', '+680', '+970', '+507', '+675', '+595', '+51', '+63', '+870', '+48', '+351', '+1-787', '+974', '+40', '+250', '+290', '+1-869', '+1-758', '+508', '+1-784', '+685', '+378', '+239', '+966', '+221', '+381', '+248', '+232', '+65', '+1721', '+421', '+386', '+677', '+252', '+27', '+82', '+211', '+34', '+94', '+249', '+597', '+46', '+41', '+963', '+886', '+992', '+255', '+66', '+1-242', '+670', '+228', '+690', '+676', '+1-868', '+216', '+90', '+993', '+1-649', '+688', '+256', '+380', '+971', '+44', '+598', '+998', '+678', '+379', '+58', '+1-284', '+1-340', '+681', '+967', '+260', '+263')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "avatar" character varying, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "birth_of_date" date, "phone_number" character varying(20), "phone_code" "public"."users_phone_code_enum" NOT NULL, "status" "public"."users_status_enum" NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying(255), "address_line1" character varying(255) NOT NULL, "address_line2" character varying(255), "country" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "postal_code" character varying(20) NOT NULL, "landmark" character varying(255), "phone_number" character varying(20) NOT NULL, "userId" uuid, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "total" numeric NOT NULL, "userId" uuid, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "description" text, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sub_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "description" text, "parentCategoryId" uuid, CONSTRAINT "PK_f319b046685c0e07287e76c5ab1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "description" text, "summary" character varying(500), "cover" character varying(255), "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_attributes_type_enum" AS ENUM('color', 'size')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_attributes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "type" "public"."product_attributes_type_enum" NOT NULL, "value" character varying(255) NOT NULL, CONSTRAINT "PK_4fa18fc5c893cb9894fc40ca921" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_skus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "sku" character varying(100) NOT NULL, "price" numeric NOT NULL, "quantity" integer NOT NULL, "productId" uuid, "sizeAttributeId" uuid, "colorAttributeId" uuid, CONSTRAINT "PK_2acf028b6a5492960021db0273a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "quantity" integer NOT NULL, "cartId" uuid, "productId" uuid, "productSKUId" uuid, CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "total" numeric NOT NULL, "userId" uuid, CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "quantity" integer NOT NULL, "orderId" uuid, "productId" uuid, "productSKUId" uuid, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "amount" numeric NOT NULL, "provider" character varying(100) NOT NULL, "status" character varying(50) NOT NULL, "orderId" uuid, CONSTRAINT "PK_309f873cfbc20f57796956a1d33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "wishlists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, "productId" uuid, CONSTRAINT "PK_d0a37f2848c5d268d315325f359" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_categories" ADD CONSTRAINT "FK_db5691b04c6237c430a8a7fed91" FOREIGN KEY ("parentCategoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "sub_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_skus" ADD CONSTRAINT "FK_a680060e1187f37b1de35b15a9c" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_skus" ADD CONSTRAINT "FK_44bd266d7f126d91b037cb20f37" FOREIGN KEY ("sizeAttributeId") REFERENCES "product_attributes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_skus" ADD CONSTRAINT "FK_da45028c12ff662079741d32cc1" FOREIGN KEY ("colorAttributeId") REFERENCES "product_attributes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD CONSTRAINT "FK_edd714311619a5ad09525045838" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD CONSTRAINT "FK_72679d98b31c737937b8932ebe6" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD CONSTRAINT "FK_9c176d17cb820e5cbe859da0dd5" FOREIGN KEY ("productSKUId") REFERENCES "product_skus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details" ADD CONSTRAINT "FK_22929b011ceecebdc519d09232a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD CONSTRAINT "FK_cdb99c05982d5191ac8465ac010" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD CONSTRAINT "FK_269c83ac77dfe22ea2630003efe" FOREIGN KEY ("productSKUId") REFERENCES "product_skus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_details" ADD CONSTRAINT "FK_7293694d7924e283ec94500b112" FOREIGN KEY ("orderId") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlists" ADD CONSTRAINT "FK_4f3c30555daa6ab0b70a1db772c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlists" ADD CONSTRAINT "FK_063c6f46d6cbebf35f3a5ec3d4e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishlists" DROP CONSTRAINT "FK_063c6f46d6cbebf35f3a5ec3d4e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlists" DROP CONSTRAINT "FK_4f3c30555daa6ab0b70a1db772c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_details" DROP CONSTRAINT "FK_7293694d7924e283ec94500b112"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_269c83ac77dfe22ea2630003efe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_cdb99c05982d5191ac8465ac010"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details" DROP CONSTRAINT "FK_22929b011ceecebdc519d09232a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" DROP CONSTRAINT "FK_9c176d17cb820e5cbe859da0dd5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" DROP CONSTRAINT "FK_72679d98b31c737937b8932ebe6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" DROP CONSTRAINT "FK_edd714311619a5ad09525045838"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_skus" DROP CONSTRAINT "FK_da45028c12ff662079741d32cc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_skus" DROP CONSTRAINT "FK_44bd266d7f126d91b037cb20f37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_skus" DROP CONSTRAINT "FK_a680060e1187f37b1de35b15a9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_categories" DROP CONSTRAINT "FK_db5691b04c6237c430a8a7fed91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`,
    );
    await queryRunner.query(`DROP TABLE "wishlists"`);
    await queryRunner.query(`DROP TABLE "payment_details"`);
    await queryRunner.query(`DROP TABLE "order_items"`);
    await queryRunner.query(`DROP TABLE "order_details"`);
    await queryRunner.query(`DROP TABLE "cart_items"`);
    await queryRunner.query(`DROP TABLE "product_skus"`);
    await queryRunner.query(`DROP TABLE "product_attributes"`);
    await queryRunner.query(
      `DROP TYPE "public"."product_attributes_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "sub_categories"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TABLE "addresses"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_phone_code_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
