import { NextFunction, Request, Response, Router } from "express";
import SessionsController from "../controllers/SessionsController";
import { celebrate, Joi, Segments } from "celebrate";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
	"/",
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await sessionsController.create(req, res, next);
		} catch (error) {
			next(error);
		}
	}
);

export default sessionsRouter;

