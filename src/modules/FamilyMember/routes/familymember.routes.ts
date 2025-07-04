import { Router } from "express";
import FamilyMemberController from "../controller/FamilyMembersController";
import validateFamilyDegree from "@shared/middlewares/validateFamilyDegree";

const familyMemberRouter = Router();
const familyMemberController = new FamilyMemberController();

familyMemberRouter.get("/", async (req, res, next) => {
	try {
		await familyMemberController.index(req, res, next);
	} catch (error) {
		next(error);
	}
});
familyMemberRouter.get("/:id", async (req, res, next) => {
	try {
		await familyMemberController.show(req, res, next);
	} catch (error) {
		next(error);
	}
});
familyMemberRouter.post("/", validateFamilyDegree, async (req, res, next) => {
	try {
		await familyMemberController.create(req, res, next);
	} catch (error) {
		next(error);
	}
});
familyMemberRouter.put("/:id", validateFamilyDegree, async (req, res, next) => {
	try {
		await familyMemberController.update(req, res, next);
	} catch (error) {
		next(error);
	}
});
familyMemberRouter.delete("/:id", async (req, res, next) => {
	try {
		await familyMemberController.delete(req, res, next);
	} catch (error) {
		next(error);
	}
});

export default familyMemberRouter;
