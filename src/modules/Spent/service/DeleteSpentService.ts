import { getCustomRepository } from "typeorm";
import Spent from "../typeorm/entities/Spent";
import SpentsRepository from "../typeorm/repository/SpentsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
	id: string;
}

export default class DeleteSpentService {
	public async execute({ id }: IRequest): Promise<void> {
		const spentRepository = getCustomRepository(SpentsRepository);
		const spent = await spentRepository.findById(id);
		if (!spent) {
			throw new AppError("Spent not found");
		}

		await spentRepository.remove(spent);
	}
}
