import Channel from "../../types/Channel";
import User from "../../types/User";
import UserService from "../user/UserService";
import ChannelRepository from "./ChannelRepository";

export default class ChannelService {
    repository: ChannelRepository
    userService: UserService

    constructor() {
        this.repository = new ChannelRepository();
        this.userService = new UserService();
    }

    public async create(channel: Channel): Promise<Channel> {
        try {
            const user: User = await this.userService.findByUuid(channel.userUuid);

            if (!user) {
                return undefined;
            }

            const uuid = await this.repository.create(channel);

            channel._id = uuid;
            return uuid ? channel : undefined;
        } catch (error) {
            return undefined;
        }
    }

    public async read(): Promise<Channel[]> {
        return this.repository.read();
    }

    public async delete(uuid: string): Promise<any> {
        try {
            return await this.repository.delete(uuid)
        } catch (error) {
            return undefined;
        }
    }

    public async findByUuid(uuid: string): Promise<Channel> {
        return this.repository.findByUuid(uuid)
    }

    public async findByName(name: string): Promise<Channel> {
        return this.repository.findByName(name);
    }

    public async findByUserUuid(userUuid: string): Promise<Channel> {
        return this.repository.findByUserUuid(userUuid);
    }

    public async updateName(uuid: string, name: string): Promise<Channel> {
        const channel: Channel = await this.repository.findByUuid(uuid);

        if (!channel) {
            return undefined;
        }

        channel.name = name;
        return this.repository.update(channel);
    }

    public async updateAbout(uuid: string, about: string): Promise<Channel> {
        const channel: Channel = await this.repository.findByUuid(uuid);

        if (!channel) {
            return undefined;
        }

        channel.about = about;
        return this.repository.update(channel);
    }

    public async incrementSubs(uuid: string): Promise<Channel> {
        const channel: Channel = await this.findByUuid(uuid);

        if (!channel) {
            return undefined;
        }

        channel.subscribers++;
        return this.repository.update(channel);
    }

    public async decrementSubs(uuid: string): Promise<Channel> {
        const channel: Channel = await this.findByUuid(uuid);

        if (!channel) {
            return undefined;
        }

        channel.subscribers--;
        return this.repository.update(channel);
    }

}