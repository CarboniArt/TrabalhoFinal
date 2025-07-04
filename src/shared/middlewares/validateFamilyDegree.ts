import { FamilyType } from "@modules/FamilyMember/services/CreateFamilyMemberService";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export default function validateFamilyDegree(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const { family_degree } = req.body;
	const allowedDegrees = Object.values(FamilyType);

	if (!allowedDegrees.includes(family_degree)) {
		throw new AppError("Invalid Family Degree");
	}

	next();
}
