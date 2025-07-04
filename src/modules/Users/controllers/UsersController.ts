import { NextFunction, Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";

export default class UsersController {
	public async index(req: Request, res: Response, next: NextFunction) {
		try {
			const listUsers = new ListUserService();
			console.log(req.user.id)
			const users = await listUsers.execute();
			return res.json(users);
		} catch (error) {
			next(error);
		}
	}
	public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, email, password} = req.body;
            const createUser = new CreateUserService();
            const user = await createUser.execute({name,email,password});

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}
