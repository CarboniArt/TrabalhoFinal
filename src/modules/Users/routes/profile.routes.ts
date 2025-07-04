import { NextFunction, Request, Response, Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAutenticated from "@shared/middlewares/isAuthenticated";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();
profileRouter.use(isAutenticated);

profileRouter.get(
	"/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await profileController.show(req, res, next);
		} catch (error) {
			next(error);
		}
	}
);

profileRouter.put(
	"/",
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			old_password: Joi.string(),
			password: Joi.string().optional(),
			password_confirmation: Joi.string()
				.valid(Joi.ref("password"))
				.when("password", { is: Joi.exist(), then: Joi.required() }),
		},
	}),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await profileController.update(req, res, next);
		} catch (error) {
			next(error);
		}
	}
);

export default profileRouter;
