import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1747129705746 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" RENAME COLUMN "caption" TO "title"`,
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" RENAME COLUMN "title" TO "caption"`,
        )
    }

    // ????
    // npx typeorm migration:run -- -d src/data-source.ts

}
