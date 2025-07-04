import { getCustomRepository } from "typeorm";
import FamilyMember from "../typeorm/entities/FamilyMember";
import FamilyMembersRepository from "../typeorm/repository/FamilyMembersRepository";
import AppError from "@shared/errors/AppError";
interface IRequest{
    id:string;
}
export default class ShowFamilyMemberService{
    public async execute({id}:IRequest):Promise<FamilyMember>{
        const familyRepository = getCustomRepository(FamilyMembersRepository);
        const family_member = await familyRepository.findById(id);
        if(!family_member){
            throw new AppError('Family member not found');
        }

        return family_member;
    }
}