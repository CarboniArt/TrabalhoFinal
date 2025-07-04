import { NextFunction, Request, Response, Router } from "express";
import UsersController from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import isAutenticated from "@shared/middlewares/isAuthenticated";
import multer from "multer";
import uploadConfig from "@config/upload";
import UserAvatarController from "../controllers/UserAvatarController";
import isAuthenticated from "@shared/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.get("/", isAutenticated, async (req, res, next) => {
	try {
		await usersController.index(req, res, next);
	} catch (err) {
		next(err);
	}
});

usersRouter.post(
	"/",
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	async (req, res, next) => {
		try {
			await usersController.create(req, res, next);
		} catch (err) {
			next(err);
		}
	}
);

usersRouter.patch(
	"/avatar",
	isAuthenticated,
	upload.single("avatar"),
	async (req, res, next) => {
		try {
			await userAvatarController.update(req, res, next);
		} catch (err) {
			next(err);
		}
	}
);

export default usersRouter;
