import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseTable1560956281223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "prefix" character varying NOT NULL, "number" character varying NOT NULL, "undergraduate" boolean NOT NULL DEFAULT false, "notes" text, "private" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "course"');
  }
}
