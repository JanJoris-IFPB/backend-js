import { Request, Response } from "express";
import LoggerComponent from "../../components/LoggerComponent";
import ParameterValidatorComponent from "../../components/ParameterValidatorComponent";
import UserDTO from "../../dto/UserDTO";
import User from "../../types/User";
import UserService from "./UserService";

const service: UserService = new UserService();
const logger = new LoggerComponent("UserController");

export default class UserController {

    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const user: User = request.body;

            const requiredParameters = ["name", "email", "password"];
            ParameterValidatorComponent.validateParameters(user, requiredParameters);

            const createdUser: User = await service.create(user);

            const result = new UserDTO(createdUser);
            logger.info("/user. Post method responded successfully", result);
            return response.status(201).json(result);
        } catch (error) {
            logger.error("/user. Post method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async read(request: Request, response: Response): Promise<Response> {
        try {
            const users: User[] = await service.read();
            const result: UserDTO[] = UserDTO.convert(users);

            logger.info("/user. Get method responded successfully", result ? result[0] : result);
            return response.status(200).json(result);
        } catch (error) {
            logger.error("/user. Get method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const result = await service.delete(uuid);
            logger.info("/user. Delete method responded successfully", { userUuid: result._id });
            return response.status(200).json("Deletado com sucesso. Uuid: " + uuid);
        } catch (error) {
            logger.error("/user. Delete method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async find(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const retrievedUser: User = await service.findByUuid(uuid);
            const result = new UserDTO(retrievedUser);

            logger.info("/user. find method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.error("/user. find method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async updateName(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;
            const { newName } = request.body;
            const params = {
                "uuid": uuid,
                "newName": newName
            };

            const requiredParameters = ["uuid", "newName"];
            ParameterValidatorComponent.validateParameters(params, requiredParameters);

            const retrievedUser: User = await service.updateName(uuid, newName);
            const result = new UserDTO(retrievedUser);

            logger.info("/user. updateName method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.error("/user. updateName method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async addRule(request: Request, response: Response): Promise<Response> {
        try {
            const { newRule } = request.body;
            const { uuid } = request.params;
            const params = {
                "uuid": uuid,
                "newRule": newRule
            };

            const requiredParameters = ["uuid", "newRule"];
            ParameterValidatorComponent.validateParameters(params, requiredParameters);

            const result = await service.addRule(uuid, newRule);
            if (result) {
                logger.info("/user. addRule method responded successfully", newRule);
                return response.status(200).json("Rule added successfully " + newRule);
            }

            throw new Error("Rule could not be added");
        } catch (error) {
            logger.warn("/user. addRule method threw an error", error);
            return response.status(400).json(error);
        }
    }

    public async removeRule(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;
            const { rule } = request.body;
            const params = {
                "uuid": uuid,
                "rule": rule
            };

            const requiredParameters = ["uuid", "rule"];
            ParameterValidatorComponent.validateParameters(params, requiredParameters);

            const result = await service.deleteRule(uuid, rule);
            if (result) {
                logger.info("/user. removeRule method response successfully", rule);
                return response.status(200).json("Rule removed successfully " + rule);
            }

            throw new Error("Rule could not be removed");
        } catch (error) {
            logger.warn("/user. removeRule method threw an error", error);
            return response.status(400).json(error);
        }
    }

}
