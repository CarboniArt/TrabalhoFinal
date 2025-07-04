import { getCustomRepository } from "typeorm";
import Spent from "../typeorm/entities/Spent";
import SpentsRepository, {
	Category,
} from "../typeorm/repository/SpentsRepository";
import FamilyMembersRepository from "@modules/FamilyMember/typeorm/repository/FamilyMembersRepository";
import AppError from "@shared/errors/AppError";
interface IRequest {
	family_member_id: string;
	title: string;
	category: Category;
	value: number;
	date: Date;
	description: string;
}
export default class CreateSpentService {
	public async execute({
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
		console.log("id que está passando na service: "+ family_member_id);
		const familyMember = await familyMemberRepository.findById(family_member_id);
		console.log(familyMember);
		if (!familyMember) {
            //Cai nessa exception 
			throw new AppError("Family member not found.");
        }
		const spent = await spentRepository.create({
			family_member_id: familyMember,
			title,
			category,
			value,
			date,
			description,
		});

		await spentRepository.save(spent);
		return spent;
	}
}
