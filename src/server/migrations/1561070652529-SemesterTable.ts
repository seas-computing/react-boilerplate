import { MigrationInterface, QueryRunner } from 'typeorm';

export class SemesterTable1561070652529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "semester" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "acyr" integer NOT NULL, "term" character varying NOT NULL, "courseInstancesId" uuid, CONSTRAINT "PK_9129c1fd35aa4aded7a9825b38d" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "semester" ADD CONSTRAINT "FK_bc7d0876e268a27203f3279effc" FOREIGN KEY ("courseInstancesId") REFERENCES "course_instance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "semester" DROP CONSTRAINT "FK_bc7d0876e268a27203f3279effc"');
    await queryRunner.query('DROP TABLE "semester"');
  }
}
