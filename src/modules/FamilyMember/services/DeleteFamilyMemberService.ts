import { getCustomRepository } from "typeorm"
import FamilyMembersRepository from "../typeorm/repository/FamilyMembersRepository"
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string
}
export default class DeleteFamilyMemberService{
    public async execute({id}:IRequest):Promise<void>{
        const familyRepository = getCustomRepository(FamilyMembersRepository);
        const family_member = await familyRepository.findById(id);
        if(!family_member){
            throw new AppError('Family member not found');
        }
        await familyRepository.remove(family_member);
    }
}