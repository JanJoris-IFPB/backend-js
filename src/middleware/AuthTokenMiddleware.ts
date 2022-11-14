import { NextFunction, Request, Response } from "express";
import JWTComponent from "../components/JWTComponent";
import LoggerComponent from "../components/LoggerComponent";
import UserService from "../entity/user/UserService";
import User from "../types/User";

const userService = new UserService();
export default class AuthTokenMiddleware {

    private logger: LoggerComponent;

    constructor() {
        this.logger = new LoggerComponent(AuthTokenMiddleware.name);
    }

    public permitUserRule(allowedRules: string[]) {

        if (allowedRules.length === 0) {
            allowedRules.push("READ");
            allowedRules.push("CREATE");
        }

        const isAllowed = (userRules: string[]): boolean => {
            for (const rule of allowedRules) {
                if(userRules.indexOf( rule ) == -1) {
                    return false;
                }
            }
           return true;
        };

        return async (request: Request, response: Response, next: NextFunction) => {
            const bearerToken = request.headers["authorization"];

            try {
                const token = bearerToken.split("Bearer ")[1];

                const userDecoded: User = await JWTComponent.decodeToken(token);

                const user: User = await userService.findByUuid(userDecoded._id);

                if (token !== undefined && isAllowed(user.rules)) {
                    this.logger.info("Authorization; Request authorized, calling the next function: " + next.name);
                    next();
                    return;
                }
                this.logger.warn("Unauthorized.");
                return response.status(401).json("Requisição não autorizada");
            } catch (error) {
                this.logger.error("Unauthorized.", error.message);
                return response.status(401).json("Requisição não autorizada. Erro: Insira um token válido");
            }
        };
    }
}