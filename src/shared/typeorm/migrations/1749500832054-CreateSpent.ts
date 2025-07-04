import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpent1749500832054 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "spents",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
                    {
                        name:"title",
                        type:"varchar"
                    },
                    {
                        name:"category",
                        type:"varchar"
                    },
                    {
                        name:"value",
                        type:"float"
                    },
                    {
                        name:"date",
                        type:"date"
                    },
                    {
                        name:"description",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    },
                    {
                        name:"updated_at",
                        type:"timestamp",
                        default:"now()"
                    }
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("spents");
	}
}
