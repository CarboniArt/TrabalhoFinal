import { EntityRepository, Repository } from "typeorm";
import Spent from "../entities/Spent";

export enum Category {
	food = "food",
	bills = "bills",
	transportation = "transportation",
	entertainment = "entertainment",
	discretionary = "discretionary", // Uma boa tradução para 'fútil' ou 'gastos não essenciais'
	other = "other",
}
interface IRequest {
	category: Category;
}

@EntityRepository(Spent)
export default class SpentsRepository extends Repository<Spent> {
	public async findById(id: string): Promise<Spent | undefined> {
		const spent = await this.findOne({ where: { id } });
		return spent;
	}
	public async findAllByFamilyMemberId(
		family_member_id: string
	): Promise<Spent[]> {
		const spentsIds = await this.find({ where: { family_member_id } });
		return spentsIds;
	}
	public async findAllByCategory({ category }: IRequest): Promise<Spent[]> {
		const spentsIds = await this.find({ where: { category } });
		return spentsIds;
	}
}
