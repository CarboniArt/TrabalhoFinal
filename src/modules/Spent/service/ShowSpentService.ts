import { getCustomRepository } from "typeorm";
import SpentsRepository from "../typeorm/repository/SpentsRepository";
import AppError from "@shared/errors/AppError";
import Spent from "../typeorm/entities/Spent";

interface IRequest {
	id: string;
}
export default class ShowSpentService {
	public async execute({ id }: IRequest): Promise<Spent> {
		const spentRepository = getCustomRepository(SpentsRepository);
		const spent = await spentRepository.findById(id);
		if (!spent) {
			throw new AppError("Spent not found");
		}

		return spent;
	}
}
