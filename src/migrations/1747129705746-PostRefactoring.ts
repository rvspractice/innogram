import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1747129705742 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" RENAME COLUMN "title3" TO "title"`,
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" RENAME COLUMN "title" TO "title3"`,
        )
    }

}
