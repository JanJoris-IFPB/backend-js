import RepositoryTemplate from "../../template/RepositoryTemplate";
import ChannelModel from "./ChannelModel";

export default class ChannelRepository extends RepositoryTemplate {
    constructor() {
        super(ChannelModel);
    }

    public async findByName(name: string) {
        return this.mongoModel.findOne({ name });
    }

    public async findByUserUuid(userUuid: string) {
        return this.mongoModel.findOne({ userUuid });
    }
}
