import RepositoryTemplate from "../../template/RepositoryTemplate";
import VideoModel from "./VideoModel";

export default class VideoRepository extends RepositoryTemplate {
    constructor() {
        super(VideoModel);
    }

    public async findAllByName(name: string) {
        return this.mongoModel.find({ name });
    }

    public async findAllByChannelUuid(channelUuid: string) {
        return this.mongoModel.find({ channelUuid });
    }
}
