import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("family_member")
export default class FamilyMember {
	@PrimaryGeneratedColumn("uuid")
	id: string;
	@Column()
	name: string;
	@Column()
	birth_date: Date;
	@Column()
	family_degree: string;
	@Column()
	profession: string;
	@Column("decimal")
	monthly_income: number;
	@CreateDateColumn()
	created_at: Date;
	@UpdateDateColumn()
	updated_at: Date;
}
