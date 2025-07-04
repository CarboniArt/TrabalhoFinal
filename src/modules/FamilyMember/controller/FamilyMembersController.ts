import { NextFunction, Request, Response } from "express";
import ListFamilyMemberService from "../services/ListFamilyMemberService";
import ShowFamilyMemberService from "../services/ShowFamilyMemberService";
import CreateFamilyMemberService from "../services/CreateFamilyMemberService";
import UpdateFamilyMemberService from "../services/UpdateFamilyMemberService";
import DeleteFamilyMemberService from "../services/DeleteFamilyMemberService";

export default class FamilyMemberController {
	public async index(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const listFamily = new ListFamilyMemberService();
			const family = await listFamily.execute();
			return response.json(family);
		} catch (error) {
			next(error);
		}
	}
	public async show(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const { id } = request.params;
			const showFamilyMember = new ShowFamilyMemberService();
			const family_member = await showFamilyMember.execute({ id });
			return response.json(family_member);
		} catch (error) {
			next(error);
		}
	}
	public async create(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const createFamilyMember = new CreateFamilyMemberService();
			const {
				name,
				birth_date,
				family_degree,
				profession,
				monthly_income,
			} = request.body;
			const family_member = await createFamilyMember.execute({
				name,
				birth_date,
				family_degree,
				profession,
				monthly_income,
			});

			return response.json(family_member);
		} catch (error) {
			next(error);
		}
	}
	public async update(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const updateFamilyMember = new UpdateFamilyMemberService();
			const { id } = request.params;
			const {
				name,
				birth_date,
				family_degree,
				profession,
				monthly_income,
			} = request.body;
			const family_member = await updateFamilyMember.execute({
				id,
				name,
				birth_date,
				family_degree,
				profession,
				monthly_income,
			});
			return response.json(family_member);
		} catch (error) {
			next(error);
		}
	}
    public async delete(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const { id } = request.params;
			const deleteFamilyMember = new DeleteFamilyMemberService();
			await deleteFamilyMember.execute({ id });
			return response.json([]);
		} catch (error) {
			next(error);
		}
	}
}
