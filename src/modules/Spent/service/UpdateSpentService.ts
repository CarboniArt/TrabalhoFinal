import FamilyMember from "@modules/FamilyMember/typeorm/entities/FamilyMember";
import SpentsRepository, {
	Category,
} from "../typeorm/repository/SpentsRepository";
import Spent from "../typeorm/entities/Spent";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import FamilyMembersRepository from "@modules/FamilyMember/typeorm/repository/FamilyMembersRepository";

interface IRequest {
	id: string;
	family_member_id: string;
	title: string;
	category: Category;
	value: number;
	date: Date;
	description: string;
}

export default class UpdateSpentService {
	public async execute({
		id,
		family_member_id,
		title,
		category,
		value,
		date,
		description,
	}: IRequest): Promise<Spent> {
		const spentRepository = getCustomRepository(SpentsRepository);
		const familyMemberRepository = getCustomRepository(
			FamilyMembersRepository
		);
		const spent = await spentRepository.findById(id);
		const family_member = await familyMemberRepository.findById(
			family_member_id
		);
		if (!spent) {
			throw new AppError("Spent not found");
		}
        if(!family_member){
            throw new AppError("Family member not found")
        }
		spent.title = title;
		spent.family_member = family_member;
		spent.category = category;
		spent.value = value;
		spent.date = date;
		spent.description = description;

		await spentRepository.save(spent);
		return spent;
	}
}
