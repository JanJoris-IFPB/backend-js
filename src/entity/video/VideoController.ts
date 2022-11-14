import { Request, Response } from "express";
import LoggerComponent from "../../components/LoggerComponent";
import ParameterValidatorComponent from "../../components/ParameterValidatorComponent";
import VideoDTO from "../../dto/VideoDTO";
import Video from "../../types/Video";
import VideoService from "./VideoService";

const service: VideoService = new VideoService();
const logger = new LoggerComponent("VideoController");

export default class VideoController {

    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const video: Video = request.body;

            const requiredParameters = ["channelUuid", "name", "description"];
            ParameterValidatorComponent.validateParameters(video, requiredParameters);

            const createdVideo: Video = await service.create(video);

            const result = new VideoDTO(createdVideo);
            logger.info("/video. Post method responded successfully", result);
            return response.status(201).json(result);
        } catch (error) {
            logger.warn("/video. Post method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async read(request: Request, response: Response): Promise<Response> {
        try {
            const videos: Video[] = await service.read();
            const result: VideoDTO[] = VideoDTO.convert(videos);

            logger.info("/video. Get method responded successfully", result ? result[0] : result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/video. Get method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const result = await service.delete(uuid);
            logger.info("/video. Delete method responded successfully", { videoUuid: result._id });
            return response.status(200).json("Deletado com sucesso. Uuid: " + uuid);
        } catch (error) {
            logger.warn("/video. Delete method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async find(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const retrievedVideo: Video = await service.findByUuid(uuid);
            const result = new VideoDTO(retrievedVideo);

            logger.info("/video. find method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/video. find method threw an error", error.message);
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

            const retrievedVideo: Video = await service.updateName(uuid, newName);
            const result = new VideoDTO(retrievedVideo);

            logger.info("/video. updateName method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/video. updateName method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async updateDescription(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;
            const { newDescription } = request.body;
            const params = {
                "uuid": uuid,
                "newDescription": newDescription
            };

            const requiredParameters = ["uuid", "newDescription"];
            ParameterValidatorComponent.validateParameters(params, requiredParameters);

            const retrievedVideo: Video = await service.updateDescription(uuid, newDescription);
            const result = new VideoDTO(retrievedVideo);

            logger.info("/video. updateDescription method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/video. updateDescription method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async incrementViews(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const retrievedVideo: Video = await service.incrementViews(uuid)
            const result = new VideoDTO(retrievedVideo);

            logger.info("/video. incrementViews method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/video. incrementViews method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async incrementLikes(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const retrievedVideo: Video = await service.incrementLikes(uuid)
            const result = new VideoDTO(retrievedVideo);

            logger.info("/video. incrementLikes method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/video. incrementLikes method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async decrementLikes(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const retrievedVideo: Video = await service.decrementLikes(uuid)
            const result = new VideoDTO(retrievedVideo);

            logger.info("/video. decrementLikes method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/video. decrementLikes method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async incrementDislikes(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const retrievedVideo: Video = await service.incrementDislikes(uuid)
            const result = new VideoDTO(retrievedVideo);

            logger.info("/video. incrementDislikes method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/video. incrementDislikes method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async decrementDislikes(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;

            const requiredParameters = ["uuid"];
            ParameterValidatorComponent.validateParameters({ uuid }, requiredParameters);

            const retrievedVideo: Video = await service.decrementDislikes(uuid)
            const result = new VideoDTO(retrievedVideo);

            logger.info("/video. decrementDislikes method responded successfully", result);
            return response.status(200).json(result);
        } catch (error) {
            logger.warn("/video. decrementDislikes method threw an error", error.message);
            return response.status(400).json(error.message);
        }
    }

}
