import { EntityRepository, Repository } from "typeorm";
import FamilyMember from "../entities/FamilyMember";
@EntityRepository(FamilyMember)
export default class FamilyMembersRepository extends Repository<FamilyMember> {
	public async findByName(name: string): Promise<FamilyMember | undefined> {
		const family_member = this.findOne({
			where: { name },
		});
		return family_member;
	}
	public async findById(id: string): Promise<FamilyMember | undefined> {
		console.log("id que está passando: "+ id);
		
		const family_member = await this.findOne({
			where: { id },
		});

		console.log("Family member na repo: " + family_member);
		return family_member;
	}
}
