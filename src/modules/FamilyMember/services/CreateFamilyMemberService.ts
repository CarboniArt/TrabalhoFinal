import { getCustomRepository } from "typeorm";
import FamilyMember from "../typeorm/entities/FamilyMember";
import FamilyMembersRepository from "../typeorm/repository/FamilyMembersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
	name: string;
	birth_date: Date;
	family_degree: FamilyType;
	profession: string;
	monthly_income: number;
}
export enum FamilyType {
	father = "father",
	mother = "mother",
	son = "son",
	daughter = "daughter",
	brother = "brother",
	sister = "sister",
	uncle = "uncle",
	aunt = "aunt",
	cousin = "cousin",
	grandfather = "grandfather",
	grandmother = "grandmother",
	nephew = "nephew",
	niece = "niece",
	stepfather = "stepfather",
	stepmother = "stepmother",
	stepson = "stepson",
	stepdaughter = "stepdaughter",
	father_in_law = "father_in_law",
	mother_in_law = "mother_in_law",
	brother_in_law = "brother_in_law",
	sister_in_law = "sister_in_law",
	spouse = "spouse",
	partner = "partner",
	other = "other",
}
export default class CreateFamilyMemberService {
	public async execute({
		name,
		birth_date,
		family_degree,
		profession,
		monthly_income,
	}: IRequest): Promise<FamilyMember> {
		const familyRepository = await getCustomRepository(
			FamilyMembersRepository
		);

		const family_memberExists = await familyRepository.findByName(name);
		if (family_memberExists) {
			throw new AppError("Family member already exist.");
		}
        //Middleware para verificar se o tipo está correto
		const family_member = await familyRepository.create({
			name,
			birth_date,
			family_degree: FamilyType[family_degree],
			profession,
			monthly_income,
		});
		await familyRepository.save(family_member);
		return family_member;
	}
}
