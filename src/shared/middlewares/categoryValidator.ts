import { Category } from "@modules/Spent/typeorm/repository/SpentsRepository";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export default function categoryValidator(
	request: Request,
	response: Response,
	next: NextFunction
): void {
	try {
		const { category } = request.body;
		if (!Object.values(Category).includes(category)) {
			throw new AppError("Please select a valid category");
		}
        return next()
	} catch (error) {
        next(error)
    }
}
