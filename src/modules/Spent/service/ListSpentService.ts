import { getCustomRepository } from "typeorm";
import Spent from "../typeorm/entities/Spent";
import SpentsRepository from "../typeorm/repository/SpentsRepository";

export default class ListSpentService{
    public async execute():Promise<Spent[]>{
        const spentRepository = getCustomRepository(SpentsRepository);
        const spents = await spentRepository.find();
        return spents;
    }
}