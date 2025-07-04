import { getCustomRepository } from "typeorm";
import FamilyMember from "../typeorm/entities/FamilyMember";
import FamilyMembersRepository from "../typeorm/repository/FamilyMembersRepository";

export default class ListFamilyMemberService {
	public async execute(): Promise<FamilyMember[]> {
		const familyRepository = getCustomRepository(FamilyMembersRepository);
		const familyMembers = await familyRepository.find();
		return familyMembers;
	}
}
