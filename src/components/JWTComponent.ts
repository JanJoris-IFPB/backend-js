import User from "../types/User";
import { sign, verify } from "jsonwebtoken";
import DotenvComponent from "./DotEnvComponents";

export default class JWtComponent {

    public static generateToken(user: User): string {
        const data = {
            _id: user._id,
            name: user.name
        };

        return sign(data, DotenvComponent.API_JWT_KEY, { expiresIn: "24h" });
    }

    public static async decodeToken(token: string): Promise<any> {
        try {
            return verify(token, DotenvComponent.API_JWT_KEY);
        } catch (error) {
            return undefined;
        }
    }

}