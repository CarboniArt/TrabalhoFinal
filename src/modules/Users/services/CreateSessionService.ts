import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}
export default class CreateSessionService {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const usersRepository = getCustomRepository(UsersRepository);
		const user = await usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Incorrect email/password combination");
		}

		const passwordConfirmed = await compare(password, user.password);
		if (!passwordConfirmed) {
			throw new AppError("Incorrect email/password combination", 401);
		}

		const token = sign({}, auth.jwt.secret, {
			subject: user.id,
			expiresIn: "1d",
		});

		return { user, token };
	}
}
