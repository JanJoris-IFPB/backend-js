import Video from "../types/Video";

export default class VideoDTO {
    private uuid: string;
    private channelUuid: string;
    private name: string;
    private description: string;
    private createdAt: Date;
    private views: number;
    private likes: number;
    private dislikes: number;

    constructor(video: Video) {
        this.uuid = video._id;
        this.channelUuid = video.channelUuid;
        this.name = video.name;
        this.description = video.description;
        this.createdAt = video.createdAt;
        this.views = video.views;
        this.likes = video.likes;
        this.dislikes = video.dislikes;
    }

    public static convert(videos: Video[]): VideoDTO[] {
        if (videos.length === 0) {
            return undefined;
        }
        return videos.map((video) => new VideoDTO(video));
    }
}