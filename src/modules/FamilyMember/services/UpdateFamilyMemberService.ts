import { getCustomRepository } from "typeorm";
import FamilyMember from "../typeorm/entities/FamilyMember";
import { FamilyType } from "./CreateFamilyMemberService";
import FamilyMembersRepository from "../typeorm/repository/FamilyMembersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
	id: string;
	name: string;
	birth_date: Date;
	family_degree: FamilyType;
	profession: string;
	monthly_income: number;
}

export default class UpdateFamilyMemberService {
	public async execute({
		id,
		name,
		birth_date,
		family_degree,
		profession,
		monthly_income,
	}: IRequest): Promise<FamilyMember> {
		const familyRepository = getCustomRepository(FamilyMembersRepository);
		const family_member = await familyRepository.findById(id);
		if (!family_member) {
			throw new AppError("Family member not found");
		}
		const family_memberExists = await familyRepository.findByName(name);
		if (family_memberExists && name != family_member.name) {
			throw new AppError(
				"There is already a family member with this name."
			);
		}
		family_member.name = name;
		family_member.birth_date = birth_date;
		family_member.family_degree = FamilyType[family_degree];
		family_member.profession = profession;
		family_member.monthly_income = monthly_income;

		await familyRepository.save(family_member);

		return family_member;
	}
}
