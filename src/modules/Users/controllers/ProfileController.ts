import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";
import { Request, Response, NextFunction } from "express";

export default class ProfileController {
	public async show(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response> {
		const showProfile = new ShowProfileService();
		const user_id = request.user.id;
		const user = await showProfile.execute({ user_id });
		return response.json(user);
	}

	public async update(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response> {
		const user_id = request.user.id;
		const { name, email, password, old_password } = request.body;
		const updateProfile = new UpdateProfileService();
		const user = await updateProfile.execute({
			user_id,
			name,
			email,
			password,
			old_password,
		});
		return response.json(user);
	}
}
