import { NextFunction, Request, Response } from "express";
import ListSpentService from "../service/ListSpentService";
import ListSpentByFamilyMemberIdService from "../service/ListSpentByFamiyMemberIdService";
import ListByCategorySpentService from "../service/ListByCategorySpentService";
import CreateSpentService from "../service/CreateSpentService";
import UpdateSpentService from "../service/UpdateSpentService";
import DeleteSpentService from "../service/DeleteSpentService";
import { Category } from "../typeorm/repository/SpentsRepository";
import ShowSpentService from "../service/ShowSpentService";

export default class SpentsController {
	public async index(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const listSpent = new ListSpentService();
			const spents = await listSpent.execute();
			return response.json(spents);
		} catch (error) {
			next(error);
		}
	}
	public async indexByFamilyMember(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const listSpent = new ListSpentByFamilyMemberIdService();
			const { family_member_id } = request.params;
			const spents = await listSpent.execute({ family_member_id });
			return response.json(spents);
		} catch (error) {
			next(error);
		}
	}
	public async indexByCategory(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const listSpent = new ListByCategorySpentService();
			const { category } = request.body;
			const spents = await listSpent.execute({
				category: category as Category,
			});
			return response.json(spents);
		} catch (error) {
			next(error);
		}
	}

	public async show(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response | undefined> {
		try {
			const { id } = request.params;
			const showSpent = new ShowSpentService();
			const spent = await showSpent.execute({ id });
			return response.json(spent);
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
			const createSpent = new CreateSpentService();
			const {
				family_member_id,
				title,
				category,
				value,
				date,
				description,
			} = request.body;

			const spent = await createSpent.execute({
				family_member_id,
				title,
				category,
				value,
				date,
				description,
			});
			return response.json(spent);
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
			const updateSpent = new UpdateSpentService();
			const { id } = request.params;
			const {
				title,
				family_member_id,
				category,
				value,
				date,
				description,
			} = request.body;

			const spent = await updateSpent.execute({
				id,
				family_member_id,
				title,
				category,
				value,
				date,
				description,
			});

			return response.json(spent);
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
			const deleteSpent = new DeleteSpentService();
			const { id } = request.params;
			await deleteSpent.execute({ id });
			return response.json([]);
		} catch (error) {
			next(error);
		}
	}
}
