import RepositoryTemplate from "../../template/RepositoryTemplate";
import ChannelModel from "./ChannelModel";

export default class ChannelRepository extends RepositoryTemplate {
    constructor() {
        super(ChannelModel);
    }
}
