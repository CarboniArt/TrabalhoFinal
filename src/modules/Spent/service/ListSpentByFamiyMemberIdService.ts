import FamilyMember from "@modules/FamilyMember/typeorm/entities/FamilyMember";
import { getCustomRepository } from "typeorm";
import SpentsRepository from "../typeorm/repository/SpentsRepository";
import Spent from "../typeorm/entities/Spent";

interface IRequest{
    family_member_id:string
}
export default class ListSpentByFamilyMemberIdService{
    public async execute({family_member_id}:IRequest):Promise<Spent[]>{
        const spentRepository = getCustomRepository(SpentsRepository);
        const spents = await spentRepository.findAllByFamilyMemberId(family_member_id);

        return spents;
    }
}