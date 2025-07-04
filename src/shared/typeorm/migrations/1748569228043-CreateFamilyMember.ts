import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFamilyMember1748569228043 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "family_member",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "birth_date",
						type: "date",
					},
					{
						name: "family_degree",
						type: "varchar",
					},
					{
						name: "profession",
						type: "varchar",
					},
					{
						name: "monthly_income",
						type: "decimal",
						precision: 10,
						scale: 2,
						isNullable: false,
					},
					{ name: "created_at", type: "timestamp", default: "now()" },
					{ name: "updated_at", type: "timestamp", default: "now()" },
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("family_member");
	}
}
