import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserToken1749181711389 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "user_tokens",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "token",
						type: "uuid",
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "user_id",
						type: "uuid",
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
					},
					{
						name: "updated_at",
						type: "timestamp",
						default: "now()",
					},
				],
				foreignKeys: [
					{
						name: "TokenUser",
						referencedTableName: "users",
						referencedColumnNames: ["id"],
						columnNames: ["user_id"],
						onDelete: "CASCADE", // apagou usuário apaga o token
						onUpdate: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("user_tokens");
	}
}
