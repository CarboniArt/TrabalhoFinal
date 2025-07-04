import { NextFunction, Request, Response, Router } from "express";
import SpentsController from "../controller/SpentsController";
import isAutenticated from "@shared/middlewares/isAuthenticated";
import categoryValidator from "@shared/middlewares/categoryValidator";
import { celebrate, Joi, Segments } from "celebrate";

const spentsRouter = Router();
const spentsController = new SpentsController();
spentsRouter.use(isAutenticated);

spentsRouter.get(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await spentsController.index(req, res, next);
		} catch (error) {
			next(error);
		}
	}
);
spentsRouter.get("/category", categoryValidator, async (req, res, next) => {
	try {
		await spentsController.indexByCategory(req, res, next);
	} catch (error) {
		next(error);
	}
});
spentsRouter.get(
	"/family-member/:family_member_id",
	celebrate({
		[Segments.PARAMS]: {
			family_member_id: Joi.string().required(),
		},
	}),
	async (req, res, next) => {
		try {
			await spentsController.indexByFamilyMember(req, res, next);
		} catch (error) {
			next(error);
		}
	}
);
spentsRouter.get(
	"/:id",
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().required(),
		},
	}),
	async (req, res, next) => {
		try {
			await spentsController.show(req, res, next);
		} catch (error) {
			next(error);
		}
	}
);

spentsRouter.post(
	"/",
	celebrate({
		[Segments.BODY]: {
			family_member_id: Joi.string().required(),
			title: Joi.string().required(),
			category: Joi.string().required(),
			value: Joi.number().required(),
			date: Joi.date().required(),
			description: Joi.string().required(),
		},
	}),
	categoryValidator,
	async (req, res, next) => {
		try {
			await spentsController.create(req, res, next);
		} catch (error) {
			next(error);
		}
	}
);

spentsRouter.put(
	"/:id",
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().required(),
		},
		[Segments.BODY]: {
			family_member_id: Joi.string().required(),
			title: Joi.string().required(),
			category: Joi.string().required(),
			value: Joi.number().required(),
			date: Joi.date().required(),
			description: Joi.string().required(),
		},
	}),
	categoryValidator,
	async (req, res, next) => {
		try {
			await spentsController.update(req, res, next);
		} catch (error) {
			next(error);
		}
	}
);
spentsRouter.delete(
	"/:id",
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().required(),
		},
	}),
	async (req, res, next) => {
		try {
			await spentsController.delete(req, res, next);
		} catch (error) {
			next(error);
		}
	}
);

export default spentsRouter;
