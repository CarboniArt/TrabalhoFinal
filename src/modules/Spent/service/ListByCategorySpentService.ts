import { getCustomRepository } from "typeorm";
import Spent from "../typeorm/entities/Spent";
import SpentsRepository, { Category } from "../typeorm/repository/SpentsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
	category: Category;
}

export default class ListByCategorySpentService {
	public async execute({ category }: IRequest): Promise<Spent[]> {
		const spentRepository = getCustomRepository(SpentsRepository);
        const spents = await spentRepository.findAllByCategory({category});

        if(!spents){
            throw new AppError("There is no spent with this category")
        }

        return spents;
	}
}
