import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from "typeorm";

export class AddFamilyMemberIdToSpent1749501796213
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			"spents",
			new TableColumn({
				name: "family_member_id",
				type: "uuid",
				isNullable: false,
			})
		);

		await queryRunner.createForeignKey(
			"spents",
			new TableForeignKey({
				name: "family_memberSpents",
				columnNames: ["family_member_id"],
				referencedTableName: "family_member",
				referencedColumnNames: ["id"],
				onDelete: "SET NULL",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("spents", "family_member_id");
	}
}
