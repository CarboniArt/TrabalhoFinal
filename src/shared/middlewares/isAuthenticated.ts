import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function isAutenticated(
	request: Request,
	response: Response,
	next: NextFunction
): void {
	const authHeader = request.headers.authorization;
	if (!authHeader) {
		throw new AppError("JWT Token is missing");
	}

	const [type, token] = authHeader.split(" ");
	try {
		const decodeToken = verify(token, auth.jwt.secret);

		const { sub } = decodeToken as ITokenPayload;
		request.user = { id: sub };

		return next();
	} catch (error) {
		next(error);
	}
}
