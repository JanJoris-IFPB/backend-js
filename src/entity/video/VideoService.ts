import ChannelService from "../channel/ChannelService";
import VideoRepository from "./VideoRepository";
import Channel from "../../types/Channel";
import Video from "../../types/Video";

export default class VideoService {

    repository: VideoRepository;
    channelService: ChannelService;

    constructor() {
        this.repository = new VideoRepository();
        this.channelService = new ChannelService();
    }

    public async create(video: Video): Promise<Video> {
        try {
            const channel: Channel = await this.channelService.findByUuid(video.channelUuid);

            if (!channel) {
                return undefined;
            }

            const uuid = await this.repository.create(video);

            video._id = uuid;
            return uuid ? video : undefined;
        } catch (error) {
            return undefined;
        }
    }

    public async read(): Promise<Video[]> {
        return this.repository.read();
    }

    public async delete(uuid: string): Promise<any> {
        try {
            return await this.repository.delete(uuid)
        } catch (error) {
            return undefined;
        }
    }

    public async findByUuid(uuid: string): Promise<Video> {
        return this.repository.findByUuid(uuid)
    }

    public async findAllByName(name: string): Promise<Video[]> {
        return this.repository.findAllByName(name);
    }

    public async findAllByChannelUuid(channelUuid: string): Promise<Video[]> {
        return this.repository.findAllByChannelUuid(channelUuid);
    }

    public async updateName(uuid: string, name: string): Promise<Video> {
        const video: Video = await this.repository.findByUuid(uuid);

        if (!video) {
            return undefined;
        }

        video.name = name;
        return this.repository.update(video);
    }

    public async updateDescription(uuid: string, description: string): Promise<Video> {
        const video: Video = await this.repository.findByUuid(uuid);

        if (!video) {
            return undefined;
        }

        video.description = description;
        return this.repository.update(video);
    }

    public async incrementViews(uuid: string): Promise<Video> {
        const video: Video = await this.repository.findByUuid(uuid);

        if (!video) {
            return undefined;
        }

        video.views++;
        return this.repository.update(video);
    }

    public async incrementLikes(uuid: string): Promise<Video> {
        const video: Video = await this.repository.findByUuid(uuid);

        if (!video) {
            return undefined;
        }

        video.likes++;
        return this.repository.update(video);
    }

    public async decrementLikes(uuid: string): Promise<Video> {
        const video: Video = await this.repository.findByUuid(uuid);

        if (!video) {
            return undefined;
        }

        video.likes--;
        return this.repository.update(video);
    }

    public async incrementDislikes(uuid: string): Promise<Video> {
        const video: Video = await this.repository.findByUuid(uuid);

        if (!video) {
            return undefined;
        }

        video.dislikes++;
        return this.repository.update(video);
    }

    public async decrementDislikes(uuid: string): Promise<Video> {
        const video: Video = await this.repository.findByUuid(uuid);

        if (!video) {
            return undefined;
        }

        video.dislikes--;
        return this.repository.update(video);
    }

}