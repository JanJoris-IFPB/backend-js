import Channel from "../types/Channel";

export default class ChannelDTO {
    private uuid: string;
    private userUuid: string;
    private name: string;
    private about: string;
    private createdAt: Date;
    private subscribers: number;

    constructor(channel: Channel) {
        this.uuid = channel._id;
        this.userUuid = channel.userUuid;
        this.name = channel.name;
        this.about = channel.about;
        this.createdAt = channel.createdAt;
        this.subscribers = channel.subscribers;
    }

    public static convert(channels: Channel[]): ChannelDTO[] {
        if (channels.length === 0) {
            return undefined;
        }
        return channels.map((channel) => new ChannelDTO(channel));
    }
}
