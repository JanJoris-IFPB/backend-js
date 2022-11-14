import { Request, Response } from "express";
import LoggerComponent from "../../components/LoggerComponent";
import ParameterValidatorComponent from "../../components/ParameterValidatorComponent";
import ChannelDTO from "../../dto/ChannelDTO";
import Channel from "../../types/Channel";
import ChannelService from "./ChannelService";

const service = new ChannelService();
const logger = new LoggerComponent("ChannelController");

export default class ChannelController {

    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const channel: Channel = request.body;

            const requiredParameters = ["userUuid", "name", "about"];
            ParameterValidatorComponent.validateParameters(channel, requiredParameters);

            const createdChannel: Channel = await service.create(channel);

            const result = new ChannelDTO(createdChannel);
            logger.info("/channel. Post method responded successfully", result);
            return response.status(201).json(result);
        } catch (error) {
            logger.warn("/channel. Post method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async read(request: Request, response: Response): Promise<Response> {
        try {
            const channels: Channel[] = await service.read();
            const result: ChannelDTO[] = ChannelDTO.convert(channels);

            logger.info("/channel. Get method responded successfully", result ? result[0] : result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/channel. Get method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const result = await service.delete(uuid);
            logger.info("/channel. Delete method responded successfully", { channelUuid: result._id });
            return response.status(200).json("Deletado com sucesso. Uuid: " + uuid);
        } catch (error) {
            logger.warn("/channel. Delete method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async find(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const retrievedChannel = await service.findByUuid(uuid);
            const result = new ChannelDTO(retrievedChannel);

            logger.info("/channel. find method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/channel. find method threw an error", error.message);
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

            const retrievedChannel: Channel = await service.updateName(uuid, newName);
            const result = new ChannelDTO(retrievedChannel);

            logger.info("/channel. updateName method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/channel. updateName method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async updateAbout(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;
            const { newAbout } = request.body;
            const params = {
                "uuid": uuid,
                "newAbout": newAbout
            };

            const requiredParameters = ["uuid", "newAbout"];
            ParameterValidatorComponent.validateParameters(params, requiredParameters);

            const retrievedChannel: Channel = await service.updateAbout(uuid, newAbout);
            const result = new ChannelDTO(retrievedChannel);

            logger.info("/channel. updateAbout method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/channel. updateAbout method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async incrementSubs(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const retrievedChannel = await service.incrementSubs(uuid);
            const result = new ChannelDTO(retrievedChannel);

            logger.info("/channel. incrementSubs method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/channel. incrementSubs method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async decrementSubs(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const retrievedChannel = await service.decrementSubs(uuid);
            const result = new ChannelDTO(retrievedChannel);

            logger.info("/channel. decrementSubs method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/channel. decrementSubs method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

}