import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import path from "path";
import upload from "@config/upload";
import fs from "fs";

interface IRequest {
	user_id: string;
	avatarFileName: string;
}

export default class UpdateAvatarUserService {
	public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository);
		const user = await usersRepository.findById(user_id);

		if (!user) {
			throw new AppError("User not found");
		}
		if (user.avatar) {
			const userAvatarFilePath = path.join(upload.directory, user.avatar);
			const userAvatarFileExists = await fs.promises.stat(
				userAvatarFilePath
			);

			if (userAvatarFileExists) {
				//remove o arquivo
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = avatarFileName;
		await usersRepository.save(user);
		return user;
	}
}
